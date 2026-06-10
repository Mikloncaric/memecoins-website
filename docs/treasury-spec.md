# Treasury System — Specification

## Concept
Trading fees from $MEME token → Treasury → Buy pump.fun tokens → Distribute to holders

## Holder Eligibility
- Minimum **$10 worth of $MEME** to qualify for weekly distribution
- Verified via Helius API snapshot before each distribution

## Treasury Categories

### 1. Collab / Partnership
- Tokens from official partnerships and collaborations
- Selected by team
- Split: 75% distributed to holders weekly, 25% held long-term in MEMECOINS treasury

### 2. Our Pick
- Tokens bought directly by treasury using trading fees — high-potential pump.fun projects
- Community votes on the next pick (see Voting section)
- Split: 100% distributed to holders weekly, no lock

## Voting System
- **Platform:** Realms (SPL Governance) — realms.today
- **Model:** 1 wallet = 1 vote (Phase 1: token-weighted via Realms; Phase 2: custom program)
- **Subject:** Holders vote on next "Our Pick" token
- **Cost:** ~0 SOL per vote (base signature fee only)
- **Future:** Custom Anchor program for strict 1-wallet-1-vote (Phase 2)

## Distribution Model

### Split (per category — see Treasury Categories)
- **Our Pick:** 100% distributed to holders, no lock
- **Collab/Partnership:** 75% distributed to holders, 25% held long-term in treasury

### Schedule
- **Weekly** distributions

### Tools
- **Liquid distribution:** Streamflow claim portal — holders pay ~0.01 SOL to claim
- **Treasury hold (25% of partner tokens):** stays in treasury wallet, no vesting contract needed
- **Snapshot:** Helius API (free) — taken before each weekly distribution
- **Eligibility filter:** Wallets with ≥ $10 worth of $MEME at snapshot time

### Estimated Cost (first 3 months)
- Helius snapshots: Free
- Per-holder cost to project: 0 SOL
- **Total: ~0 SOL**

## Treasury Website Display
Each token in treasury shows:
- Token name + logo
- Category (Collab / Our Pick)
- **% of total treasury** by $ value
- Clickable → opens token detail modal

### Token Detail View (on click)
- Current live price
- Price chart embed (DexScreener or GeckoTerminal — free embeds)
- % of treasury
- Category label

## Open Questions
- Voting: migrate to strict 1-wallet-1-vote custom program in Phase 2?
- DexScreener vs GeckoTerminal for chart embeds (evaluate when building)
- Claim portal UX vs auto-airdrop (claim portal chosen — cheaper at scale)
