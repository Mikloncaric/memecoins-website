// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('nav-hamburger');
const navMenu = document.getElementById('nav-links');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== PORTFOLIO TRACKER =====
// Public, browser-friendly Solana RPC (allows CORS, no API key). api.mainnet-beta
// blocks browser origins (403), so we use PublicNode here.
const RPC_URL = 'https://solana-rpc.publicnode.com';
const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
const TOKEN_2022 = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
const LAMPORTS_PER_SOL = 1_000_000_000;

// Slice colors (gold, teals, Solana green/purple, greens)
const PALETTE = ['#C9A227', '#0DD4C8', '#9945FF', '#22c55e', '#F0C040', '#14F195', '#0AA89E', '#8B6F1E'];

const $ = id => document.getElementById(id);

function isValidSolanaAddress(a) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(a.trim());
}

function shortAddr(a) {
  return a.slice(0, 4) + '…' + a.slice(-4);
}

function usdFmt(v) {
  if (v >= 1) return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return '$' + v.toLocaleString('en-US', { maximumSignificantDigits: 4 });
}

function amtFmt(v) {
  if (v >= 1) return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return v.toLocaleString('en-US', { maximumSignificantDigits: 4 });
}

async function rpc(method, params) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`RPC HTTP ${res.status}`);
    const json = await res.json();
    if (json.error) throw new Error(json.error.message || 'RPC error');
    return json.result;
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('RPC timed out');
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

async function getSolBalance(address) {
  const r = await rpc('getBalance', [address]);
  return r.value / LAMPORTS_PER_SOL;
}

async function getTokens(address) {
  const out = [];
  const lists = await Promise.all([TOKEN_PROGRAM, TOKEN_2022].map(async (programId) => {
    try {
      return await rpc('getTokenAccountsByOwner', [address, { programId }, { encoding: 'jsonParsed' }]);
    } catch {
      return { value: [] };
    }
  }));
  for (const r of lists) {
    for (const acc of r.value || []) {
      const info = acc.account?.data?.parsed?.info;
      const amount = info?.tokenAmount?.uiAmount;
      if (info?.mint && amount && amount > 0) {
        out.push({ mint: info.mint, amount });
      }
    }
  }
  return out;
}

async function getSolPrice() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const json = await res.json();
    return json?.solana?.usd ?? 0;
  } catch {
    return 0;
  }
}

// DexScreener gives symbol, name, USD price and logo for up to 30 mints in one call.
async function getTokenMeta(mints) {
  const map = {};
  if (!mints.length) return map;
  const slice = mints.slice(0, 30);
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${slice.join(',')}`);
    if (!res.ok) return map;
    const json = await res.json();
    const pairs = json.pairs || [];
    for (const mint of slice) {
      const tp = pairs
        .filter(p => p.baseToken?.address === mint)
        .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
      if (!tp.length) continue;
      const p = tp[0];
      map[mint] = {
        symbol: p.baseToken?.symbol || '',
        name: p.baseToken?.name || '',
        priceUsd: parseFloat(p.priceUsd) || 0,
        logo: p.info?.imageUrl || '',
      };
    }
  } catch { /* ignore, degrade gracefully */ }
  return map;
}

// ===== SVG DONUT =====
function polar(cx, cy, r, deg) {
  const a = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function arcSlice(cx, cy, r, startDeg, endDeg) {
  const [sx, sy] = polar(cx, cy, r, startDeg);
  const [ex, ey] = polar(cx, cy, r, endDeg);
  const large = (endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;
}

function buildDonut(segments) {
  const cx = 110, cy = 110, r = 100;
  let angle = 0;
  let paths = '';
  for (const s of segments) {
    if (s.pct >= 99.999) {
      paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${s.color}" />`;
    } else if (s.pct > 0) {
      const end = angle + (s.pct / 100) * 360;
      paths += `<path d="${arcSlice(cx, cy, r, angle, end)}" fill="${s.color}" />`;
      angle = end;
    }
  }
  paths += `<circle cx="${cx}" cy="${cy}" r="62" fill="var(--bg2)" />`;
  return `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
}

// ===== RENDER =====
function setStatus(msg, isError) {
  const el = $('pf-status');
  el.textContent = msg || '';
  el.className = 'pf-status' + (isError ? ' error' : '');
}

function render(address, solAmount, solPrice, tokens, metaMap) {
  const holdings = [];

  if (solAmount > 0 && solPrice > 0) {
    holdings.push({ symbol: 'SOL', name: 'Solana', amount: solAmount, usd: solAmount * solPrice, logo: null });
  }

  for (const t of tokens) {
    const m = metaMap[t.mint];
    if (m && m.priceUsd > 0) {
      holdings.push({
        symbol: m.symbol || shortAddr(t.mint),
        name: m.name || '',
        amount: t.amount,
        usd: t.amount * m.priceUsd,
        logo: m.logo || null,
      });
    }
  }

  holdings.sort((a, b) => b.usd - a.usd);

  const total = holdings.reduce((s, h) => s + h.usd, 0);

  if (!holdings.length || total <= 0) {
    setStatus('No priced holdings found for this wallet.', false);
    $('pf-content').classList.remove('show');
    return;
  }

  holdings.forEach((h, i) => {
    h.color = PALETTE[i % PALETTE.length];
    h.pct = (h.usd / total) * 100;
  });

  $('pf-total').textContent = usdFmt(total);
  $('pf-sub').textContent = `${holdings.length} holding${holdings.length > 1 ? 's' : ''} · ${shortAddr(address)}`;

  $('pf-chart-wrap').innerHTML = buildDonut(holdings.map(h => ({ pct: h.pct, color: h.color })));

  $('pf-holdings').innerHTML = holdings.map(h => {
    const logoHTML = h.logo
      ? `<img src="${h.logo}" class="pf-row-logo" alt="${h.symbol}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'pf-row-logo',textContent:'${(h.symbol[0] || '?')}'}))" />`
      : `<div class="pf-row-logo">${h.symbol[0] || '?'}</div>`;
    return `
      <div class="pf-row">
        ${logoHTML}
        <div>
          <div class="pf-row-name"><span class="pf-dot" style="background:${h.color}"></span>${h.symbol}</div>
          <div class="pf-row-amount">${amtFmt(h.amount)} ${h.symbol}</div>
        </div>
        <span class="pf-row-usd">${usdFmt(h.usd)}</span>
        <span class="pf-row-pct">${h.pct.toFixed(1)}%</span>
      </div>`;
  }).join('');

  setStatus('', false);
  $('pf-content').classList.add('show');
}

async function lookup(address) {
  const results = $('portfolio-results');
  results.classList.add('show');
  $('pf-content').classList.remove('show');
  setStatus('Loading wallet…', false);

  try {
    const [solAmount, tokens, solPrice] = await Promise.all([
      getSolBalance(address),
      getTokens(address),
      getSolPrice(),
    ]);
    const metaMap = await getTokenMeta(tokens.map(t => t.mint));
    render(address, solAmount, solPrice, tokens, metaMap);
  } catch (e) {
    setStatus('Could not load this wallet right now (' + e.message + '). The public Solana RPC can rate-limit, try again in a moment.', true);
    $('pf-content').classList.remove('show');
  }
}

const form = $('pf-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = $('pf-address').value.trim();
    if (!isValidSolanaAddress(address)) {
      $('portfolio-results').classList.add('show');
      setStatus('That does not look like a valid Solana address.', true);
      $('pf-content').classList.remove('show');
      return;
    }
    lookup(address);
  });
}
