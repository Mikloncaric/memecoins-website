# Treasury System — Specification

## Concept
Trading fees from $MEME token → Treasury → Buy pump.fun tokens → Distribute to holders

## Holder Eligibility
- Minimum **$10 worth of $MEME**, held continuously for the 7 days before distribution AND at the moment of distribution
- Prevents buy-right-before-snapshot-then-sell gaming
- Verified via Helius API snapshots (start of window + distribution moment)

## Treasury Categories

### 1. Collab / Partnership
- Tokens received from official partnerships and collaborations (not bought by treasury)
- Selected by team
- Split:
  - **50%** distributed weekly to eligible $MEME holders (see Holder Eligibility)
  - **50%** held by treasury for 1 year, then distributed exclusively to long-term $MEME holders (continuously held $MEME for 1+ year) as a loyalty reward

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
- **Our Pick:** 100% distributed weekly to eligible holders, no lock
- **Collab/Partnership:** 50% distributed weekly to eligible holders, 50% held 1 year then distributed only to long-term (1+ year) $MEME holders

### Schedule
- **Weekly** — regular distribution pool (Our Pick 100%, Collab/Partnership 50%)
- **Annual** — Collab/Partnership long-term holder pool, 1 year after treasury receives the tokens

### Tools
- **Liquid distribution:** Streamflow claim portal — holders pay ~0.01 SOL to claim
- **Treasury hold (50% of partner tokens, 1yr):** stays in treasury wallet, no vesting contract needed
- **Snapshot:** Helius API (free) — weekly (window start + distribution moment) for regular eligibility; ongoing snapshots to track 1+ year continuous holders for the long-term pool
- **Eligibility filter:** Wallets with ≥ $10 worth of $MEME, held continuously through the snapshot window
- **Long-term filter:** Wallets holding $MEME continuously for 1+ year (Collab/Partnership held-portion only)

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
