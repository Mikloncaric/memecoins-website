// Polls the watched wallet's SOL balance and accumulates the increase as
// "fees received". Run on a schedule by .github/workflows/fee-tracker.yml.
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

async function getBalanceLamports(address) {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getBalance',
      params: [address],
    }),
  });

  if (!res.ok) {
    throw new Error(`RPC HTTP ${res.status}`);
  }

  const json = await res.json();
  if (json.error) {
    throw new Error(`RPC error: ${json.error.message}`);
  }

  return json.result.value;
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

async function main() {
  const raw = await readFile(DATA_PATH, 'utf-8');
  const stats = JSON.parse(raw);

  const balance = await getBalanceLamports(WATCHED_WALLET);
  console.log(`Watched wallet balance: ${balance} lamports (${balance / LAMPORTS_PER_SOL} SOL)`);

  const isFirstRun = stats.lastUpdated === null;

  if (isFirstRun) {
    console.log('First run: seeding baseline balance, no fees counted yet.');
  } else {
    const delta = Math.max(0, balance - stats.lastBalanceLamports);
    const deltaSol = delta / LAMPORTS_PER_SOL;
    stats.weeklyFees += deltaSol;
    stats.totalFeesReceived += deltaSol;
    console.log(`Delta: +${deltaSol} SOL (weeklyFees now ${stats.weeklyFees})`);
  }

  stats.lastBalanceLamports = balance;
  stats.currentBalanceSol = balance / LAMPORTS_PER_SOL;

  const price = await getSolPrice();
  if (price !== null) {
    stats.solPrice = price;
  } else {
    console.warn('SOL price fetch failed, keeping previous value.');
  }

  stats.lastUpdated = new Date().toISOString();

  await writeFile(DATA_PATH, JSON.stringify(stats, null, 2) + '\n');
  console.log('Wrote', DATA_PATH);
}

main().catch(err => {
  console.error('Fee tracker update failed:', err.message);
  process.exit(1);
});
