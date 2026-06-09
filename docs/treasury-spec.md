# Treasury System — Specification

## Concept
Trading fees from $MEME token → Treasury → Buy AnonCoin tokens → Distribute to holders

## Holder Eligibility
- Minimum **$10 worth of $MEME** to qualify for weekly distribution
- Verified via Helius API snapshot before each distribution

## Treasury Categories

### 1. Collab / Partnership
- Tokens from official partnerships and collaborations
- Selected by team

### 2. Our Pick
- Tokens the team selects as high-potential AnonCoin projects
- Community votes on the next pick (see Voting section)

## Voting System
- **Platform:** Realms (SPL Governance) — realms.today
- **Model:** 1 wallet = 1 vote (Phase 1: token-weighted via Realms; Phase 2: custom program)
- **Subject:** Holders vote on next "Our Pick" token
- **Cost:** ~0 SOL per vote (base signature fee only)
- **Future:** Custom Anchor program for strict 1-wallet-1-vote (Phase 2)

## Distribution Model

### Split
- **25%** of distributed tokens → Locked for 1 year (vesting)
- **75%** of distributed tokens → Liquid, to eligible holders

### Schedule
- **Weekly** distributions

### Tools
- **Vesting (25%):** Streamflow vesting contract, 1-year cliff — 0.17 SOL one-time
- **Liquid (75%):** Streamflow claim portal — holders pay ~0.01 SOL to claim
- **Snapshot:** Helius API (free) — taken before each weekly distribution
- **Eligibility filter:** Wallets with ≥ $10 worth of $MEME at snapshot time

### Estimated Cost (first 3 months)
- Streamflow vesting setup: ~0.17 SOL (one-time)
- Helius snapshots: Free
- Per-holder cost to project: 0 SOL
- **Total: ~1 SOL**

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
