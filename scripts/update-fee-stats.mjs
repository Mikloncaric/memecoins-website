// Sums incoming SOL (fees) to the watched wallet from its transaction history,
// instead of polling the balance delta. Reading per-transaction inflows counts
// fees correctly even when the wallet is swept between checks (balance polling
// misses anything that arrives and leaves within one interval).
// Run on a schedule by .github/workflows/fee-tracker.yml.
//
// Output (data/fee-stats.json) is fetched directly by treasury.js — no
// backend/API required.

import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '..', 'data', 'fee-stats.json');

const WATCHED_WALLET = process.env.WATCHED_WALLET || 'Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY';
const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const LAMPORTS_PER_SOL = 1_000_000_000;
// Safety cap on transactions processed per run, so a runaway backlog on a very
// active wallet can't hang the job. The real creator wallet stays well under this.
const MAX_TX_PER_RUN = Number(process.env.MAX_TX_PER_RUN || 1000);

async function rpc(method, params) {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`RPC HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);
  return json.result;
}

// Newest-first list of signatures more recent than `untilSig`.
async function getNewSignatures(address, untilSig) {
  const out = [];
  let before;
  while (out.length < MAX_TX_PER_RUN) {
    const opts = { limit: 1000 };
    if (before) opts.before = before;
    if (untilSig) opts.until = untilSig;
    const batch = await rpc('getSignaturesForAddress', [address, opts]);
    if (!batch.length) break;
    out.push(...batch);
    if (batch.length < 1000) break;
    before = batch[batch.length - 1].signature;
  }
  return out;
}

// SOL received by `address` in this transaction (0 if it was a net outflow or failed).
async function getInflowSol(signature, address) {
  const tx = await rpc('getTransaction', [signature, { maxSupportedTransactionVersion: 0 }]);
  if (!tx || !tx.meta || tx.meta.err) return 0;
  // preBalances/postBalances are indexed by static account keys first, then
  // loaded (lookup-table) writable, then loaded readonly. Build the full ordered
  // list so a wallet that appears as a loaded address still lines up correctly.
  const loaded = tx.meta.loadedAddresses || {};
  const keys = [
    ...tx.transaction.message.accountKeys,
    ...(loaded.writable || []),
    ...(loaded.readonly || []),
  ];
  const i = keys.indexOf(address);
  if (i < 0) return 0;
  const delta = tx.meta.postBalances[i] - tx.meta.preBalances[i];
  return delta > 0 ? delta / LAMPORTS_PER_SOL : 0;
}

async function getBalanceSol(address) {
  const r = await rpc('getBalance', [address]);
  return r.value / LAMPORTS_PER_SOL;
}

async function getSolPrice() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    if (!res.ok) return null;
    const json = await res.json();
    return json?.solana?.usd ?? null;
  } catch {
    return null;
  }
}

async function updatePurchasePrices(purchases) {
  if (!purchases || !purchases.length) return;

  try {
    const addresses = purchases.map(p => p.tokenCa).join(',');
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${addresses}`);
    if (!res.ok) {
      console.warn('DexScreener fetch failed, keeping previous purchase prices.');
      return;
    }

    const json = await res.json();
    const pairs = json.pairs || [];

    for (const purchase of purchases) {
      const tokenPairs = pairs
        .filter(p => p.baseToken?.address === purchase.tokenCa)
        .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));

      if (tokenPairs.length === 0) continue;

      const price = parseFloat(tokenPairs[0].priceUsd);
      if (isNaN(price) || price <= 0) continue;

      purchase.currentPrice = price;
      purchase.changePercent = ((price - purchase.priceAtPurchase) / purchase.priceAtPurchase) * 100;
    }
  } catch (e) {
    console.warn('Purchase price update failed:', e.message);
  }
}

async function main() {
  const stats = JSON.parse(await readFile(DATA_PATH, 'utf-8'));

  stats.currentBalanceSol = await getBalanceSol(WATCHED_WALLET);
  console.log(`Watched wallet balance: ${stats.currentBalanceSol} SOL`);

  if (!stats.lastSignature) {
    // First run with tx-summing: record the latest signature as the baseline and
    // count nothing yet, so we don't sum the wallet's entire historical inflow.
    const recent = await rpc('getSignaturesForAddress', [WATCHED_WALLET, { limit: 1 }]);
    stats.lastSignature = recent[0]?.signature ?? null;
    console.log(`Seeded baseline signature: ${stats.lastSignature} (no fees counted this run).`);
  } else {
    const newSigs = await getNewSignatures(WATCHED_WALLET, stats.lastSignature);
    console.log(`New transactions since last run: ${newSigs.length}`);
    if (newSigs.length >= MAX_TX_PER_RUN) {
      console.warn(`Hit MAX_TX_PER_RUN (${MAX_TX_PER_RUN}); older transactions may be processed next run.`);
    }

    let inflow = 0;
    for (const s of newSigs) {
      inflow += await getInflowSol(s.signature, WATCHED_WALLET);
    }

    if (newSigs.length) {
      stats.weeklyFees += inflow;
      stats.totalFeesReceived += inflow;
      stats.lastSignature = newSigs[0].signature; // newest processed
      console.log(`Summed fee inflow: +${inflow.toFixed(9)} SOL (weeklyFees now ${stats.weeklyFees.toFixed(9)})`);
    }
  }

  const price = await getSolPrice();
  if (price !== null) {
    stats.solPrice = price;
  } else {
    console.warn('SOL price fetch failed, keeping previous value.');
  }

  await updatePurchasePrices(stats.purchases);

  stats.lastUpdated = new Date().toISOString();

  await writeFile(DATA_PATH, JSON.stringify(stats, null, 2) + '\n');
  console.log('Wrote', DATA_PATH);
}

main().catch(err => {
  console.error('Fee tracker update failed:', err.message);
  process.exit(1);
});
