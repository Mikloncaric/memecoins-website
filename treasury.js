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

// ===== TREASURY DATA =====
// When tokens are added to treasury, populate this array.
// Each token entry:
// {
//   name: 'Token Name',
//   symbol: '$SYM',
//   category: 'collab' | 'pick',
//   logo: 'url or null',
//   ca: 'contract_address',        // Solana CA for DexScreener
//   treasuryPct: 45.2,             // % of total treasury by $ value
//   treasuryUsd: 1234.56,          // USD value in treasury
//   dexscreenerPair: 'pair_address' // for chart embed
// }

const TREASURY_TOKENS = [
  // Example (commented out — activate when real tokens are added):
  // {
  //   name: 'Example Token',
  //   symbol: '$EX',
  //   category: 'pick',
  //   logo: null,
  //   ca: 'SolanaCaHere',
  //   treasuryPct: 100,
  //   treasuryUsd: 500,
  //   dexscreenerPair: 'pairAddressHere'
  // }
];

// ===== RENDER TOKENS =====
function renderTokens() {
  const collabGrid = document.getElementById('collab-grid');
  const pickGrid = document.getElementById('pick-grid');

  const collabTokens = TREASURY_TOKENS.filter(t => t.category === 'collab');
  const pickTokens   = TREASURY_TOKENS.filter(t => t.category === 'pick');

  if (collabTokens.length > 0) {
    collabGrid.innerHTML = collabTokens.map(t => tokenCardHTML(t)).join('');
  }

  if (pickTokens.length > 0) {
    pickGrid.innerHTML = pickTokens.map(t => tokenCardHTML(t)).join('');
  }

  // Stats
  const totalUsd = TREASURY_TOKENS.reduce((sum, t) => sum + (t.treasuryUsd || 0), 0);
  document.getElementById('total-value').textContent = '$' + totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('token-count').textContent = TREASURY_TOKENS.length;

  // Attach click listeners
  document.querySelectorAll('.token-card').forEach(card => {
    card.addEventListener('click', () => {
      const ca = card.dataset.ca;
      const token = TREASURY_TOKENS.find(t => t.ca === ca);
      if (token) openModal(token);
    });
  });
}

function tokenCardHTML(token) {
  const logoHTML = token.logo
    ? `<img src="${token.logo}" class="token-logo" alt="${token.name}" />`
    : `<div class="token-logo">${token.symbol.charAt(1) || '?'}</div>`;

  const changeClass = (token.change24h >= 0) ? 'change-pos' : 'change-neg';
  const changeSign  = (token.change24h >= 0) ? '+' : '';
  const changeText  = token.change24h != null ? `${changeSign}${token.change24h.toFixed(2)}%` : '—';

  const priceText = token.price != null
    ? '$' + token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumSignificantDigits: 6 })
    : '—';

  return `
    <div class="token-card" data-ca="${token.ca}">
      <div class="token-card-top">
        ${logoHTML}
        <div>
          <div class="token-card-name">${token.name}</div>
          <div class="token-card-symbol">${token.symbol}</div>
        </div>
      </div>
      <div class="token-card-bar-section">
        <div class="token-pct-label">
          <span>% of Treasury</span>
          <strong>${token.treasuryPct.toFixed(1)}%</strong>
        </div>
        <div class="token-bar-bg">
          <div class="token-bar-fill" style="width: ${token.treasuryPct}%"></div>
        </div>
      </div>
      <div class="token-card-footer">
        <span class="token-price">${priceText}</span>
        <span class="token-change ${changeClass}">${changeText}</span>
        <span class="token-view-btn">View →</span>
      </div>
    </div>
  `;
}

// ===== MODAL =====
function openModal(token) {
  document.getElementById('modal-name').textContent = token.name;
  document.getElementById('modal-category').textContent =
    token.category === 'collab' ? 'Collab / Partnership' : 'Our Pick';

  const logoEl = document.getElementById('modal-logo');
  if (token.logo) {
    logoEl.innerHTML = `<img src="${token.logo}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
  } else {
    logoEl.textContent = token.symbol.charAt(1) || '?';
  }

  const price = token.price != null
    ? '$' + token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumSignificantDigits: 6 })
    : 'Loading...';
  document.getElementById('modal-price').textContent = price;
  document.getElementById('modal-pct').textContent = token.treasuryPct.toFixed(1) + '%';

  const changeEl = document.getElementById('modal-change');
  if (token.change24h != null) {
    const sign = token.change24h >= 0 ? '+' : '';
    changeEl.textContent = `${sign}${token.change24h.toFixed(2)}%`;
    changeEl.style.color = token.change24h >= 0 ? 'var(--green-light)' : '#ff6b7a';
  } else {
    changeEl.textContent = '—';
  }

  // DexScreener embed
  const iframe = document.getElementById('chart-iframe');
  if (token.dexscreenerPair) {
    iframe.src = `https://dexscreener.com/solana/${token.dexscreenerPair}?embed=1&theme=dark&trades=0&info=0`;
  } else {
    iframe.src = '';
    document.getElementById('modal-chart').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.9rem;">Chart not available yet</div>';
  }

  // Buy link
  const buyBtn = document.getElementById('modal-buy');
  buyBtn.href = token.ca ? `https://pump.fun/coin/${token.ca}` : '#';

  // Open overlay
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  // Clear iframe to stop loading
  setTimeout(() => { document.getElementById('chart-iframe').src = ''; }, 300);
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== INIT =====
renderTokens();
