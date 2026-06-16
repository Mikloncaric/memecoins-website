# MEMECOINS ($MEMES) Development & Release Plan

## Why a cadence

Crypto communities judge a project by visible, steady progress. The plan: ship something on a regular schedule and communicate it every week, so there is always fresh proof the project is moving. Features land on planned dates, not ad hoc, so the progress reads as deliberate.

## How every feature ships (the pipeline)

1. **Build** on the `simulation` branch
2. **Test** locally (preview) and on Vercel staging
3. **Push live** on schedule once approved (site features go to `master` / GitHub Pages, tracker features go to `main` / Vercel)
4. **Announce** the drop on X (this feeds the weekly progress posts)

Pre-launch, trackers are tested on `simulation` with placeholder/simulated data (that is exactly what the simulation branch is for). At launch we flip them to real on-chain data.

## Launch-critical core (must be ready for the July launch)

The day-one transparency that the community looks at first:

- [x] **Fee tracker** (fee naknade) — built on simulation (`27d6eac`), activate with the real creator wallet at launch
- [x] **Purchase tracking** (kupnje) — built (record-purchase workflow + purchase history)
- [ ] **Distribution tracker** (distribucija) — NOT built yet. Shows weekly distributions to holders (per token, amount, date). This is the missing core piece.
- [ ] **CA live** on the site + Buy links enabled at launch
- [ ] Operational (off-site, needed for distributions to actually run): Helius snapshot eligibility + Streamflow claim portal

## Pre-launch build queue (now to July, staged on simulation)

1. **Distribution tracker** (launch-critical, see above)
2. **Portfolio / Rewards tracker** — enter a Solana address, see SOL + SPL balances and a pie chart of the split. Rewards section wires to distribution data once it exists. Design already reviewed, hand-rolled SVG, no backend, ready to build.

## Post-launch feature drops (recommended ~every 2 weeks: build, test, push)

Rough order, adjustable:

1. Eligibility snapshot + claim portal live (Streamflow)
2. Voting live (Realms)
3. "Share this" bonus multiplier (track shares, reward in future distributions)
4. Fun IRL Hub buildout (categories and partners as they come)
5. Android PWA (token status + rewards + where to spend)
6. Later phases: launchpad for vetted pump.fun projects, CEX listings, cross-chain

## Communication cadence

- **Weekly:** a build-in-public post (what shipped, or what is being built), plus a treasury/fee snapshot once live
- **Monthly:** a recap post tied to the larger feature drop of that month

## Open choice

Cadence is the one thing to lock in: weekly, every 2 weeks, or monthly feature drops.
**Recommendation: feature drop every 2 weeks + a weekly progress post.** Enough to look active without overpromising on a small team.
