# MEMECOINS ($MEMES) — Whitepaper

**Version 0.1 — Draft for review**

---

## Abstract

Most memecoins follow the same arc: a burst of hype, a price spike, and then silence — holders are left with a token that has no further reason to exist. $MEMES is built around a different idea: turn ordinary trading activity into an engine that continuously rewards holders with *other* promising tokens from the pump.fun ecosystem. The mechanism starts working from the very first trade — no graduation milestone, no "eventually."

---

## 1. Introduction

$MEMES is a token launched on **pump.fun** (Solana). Every trade on the bonding curve generates a creator fee. Instead of disappearing into a single wallet, that fee is split 50/50: half funds a **treasury** that buys other pump.fun tokens and redistributes them to $MEMES holders on a weekly basis, and half funds ongoing **development** of the project.

The result is a flywheel: trading activity funds the treasury → the treasury buys tokens → tokens are distributed to holders → holders have more reason to hold and engage → more trading activity. We call this the **Meme Economy flywheel**.

---

## 2. Fee Mechanism

$MEMES relies entirely on pump.fun's native creator fee — there is no additional tax, no separate buy/sell fee layered on top.

- **Bonding curve (pre-graduation):** creator fee of **0.3%** of trade volume, active **immediately from the first trade** — there is no waiting period or graduation requirement.
- **Post-graduation (PumpSwap):** fees follow pump.fun's tiered structure based on market cap. The rate rises to roughly **0.95%** in mid-range tiers, then tapers down to **0.05%** at very large market caps (98,240+ SOL).
- All fees accrue to the **creator wallet** — the same wallet that launched $MEMES. This wallet is publicly verifiable on-chain at all times.

---

## 3. The 50/50 Split

Every fee payout received by the creator wallet is divided manually by the team:

- **50% → Treasury.** Used to buy other pump.fun tokens, which are then distributed to $MEMES holders (see Section 4).
- **50% → Development.** Covers website/infrastructure costs, tooling, design, and continued build-out of the project (portfolio tracker, mobile app, governance tooling, etc.).

Because both the creator wallet and the treasury wallet are public Solana addresses, every split, purchase, and distribution can be independently verified on-chain.

---

## 4. Treasury & Distribution

The treasury holds two categories of tokens, each with its own distribution rules.

### 4.1 Our Pick

Tokens the treasury **buys directly** using trading fees. The community votes on which pump.fun project gets picked next (see Section 5).

- **100% distributed to eligible holders weekly**
- No lock, no cut for the treasury

### 4.2 Collab / Partnership

Tokens **received from official partnerships and collaborations** — not purchased by the treasury, but allocated to $MEMES by partner projects. Selected by the team.

- **50%** distributed weekly to eligible holders, same as Our Pick
- **50%** held by the treasury for **1 year**, then distributed exclusively to **long-term $MEMES holders** (see 4.4) as a loyalty reward

This split rewards the people who stick around — the longer you hold $MEMES, the more of these partner-token pools you become eligible for.

### 4.3 Holder Eligibility (anti-gaming)

To receive any weekly distribution, a wallet must hold:

- At least **$10 worth of $MEMES**
- **Continuously** for the 7 days leading up to the distribution **and** at the exact moment of distribution

Eligibility is verified via Helius API snapshots taken at the start of the 7-day window and again at the distribution moment. This prevents wallets from buying in right before a snapshot, collecting a reward, and immediately selling.

### 4.4 Long-Term Holder Reward

The 1-year-locked portion of Collab/Partnership tokens (Section 4.2) is reserved for **long-term holders** — wallets that have held $MEMES **continuously for 1+ year**, tracked via ongoing Helius snapshots. When the lock period for a given partner-token allocation ends, that pool is distributed exclusively among qualifying long-term holders.

### 4.5 Schedule & Claiming

| Pool | Frequency | Mechanism |
|---|---|---|
| Our Pick (100%) | Weekly | Streamflow claim portal |
| Collab/Partnership (50% liquid) | Weekly | Streamflow claim portal |
| Collab/Partnership (50% locked) | Annual, per allocation | Streamflow claim portal, after 1-year hold |

Claiming is self-serve: eligible holders connect to the Streamflow claim portal and claim their allocation, paying a small network fee (~0.01 SOL) to cover the claim transaction. Nothing is force-airdropped.

---

## 5. Governance / Voting

Holders decide what the treasury buys next.

- **Platform:** [Realms](https://realms.today) (SPL Governance) — on-chain, auditable voting
- **Subject:** which pump.fun token becomes the next "Our Pick"
- **Weighting:** voting power is proportional to **$MEMES held** (token-weighted), not one-wallet-one-vote
- **Cost:** effectively free — only the base Solana transaction fee
- **Future:** Phase 2 will evaluate a custom on-chain program for stricter one-wallet-one-vote governance, reducing the influence of large holders on individual votes

---

## 6. Tokenomics

| Field | Value |
|---|---|
| Token | $MEMES |
| Blockchain | Solana |
| Launch platform | pump.fun |
| Contract Address | TBA at launch |
| Team Allocation | TBA |
| Community | 100% — fair launch, no presale |

All tokenomics figures will be finalized and locked at launch and reflected on [memecoinssol.xyz](https://memecoinssol.xyz).

---

## 7. Roadmap

**Phase 1 — Launch**
- Token launch on pump.fun
- Website live (memecoinssol.xyz)
- Whitepaper
- Community building
- X growth campaign

**Phase 2 — Ecosystem**
- First treasury buys
- Holder distribution system live (eligibility tracking, claim portal)
- Telegram community
- Partner project onboarding (Collab/Partnership category)

**Phase 3 — Expansion**
- CEX listings
- DAO governance (custom voting program)
- Fun IRL Hub: turn memecoins into real-world fun (gift cards, vouchers, credit)
- Launchpad for vetted pump.fun projects
- Cross-chain expansion

---

## 8. Risks & Disclaimer

$MEMES is an experimental token built on a public, permissionless launch platform. As with any crypto asset:

- Token prices are highly volatile and can go to zero.
- The treasury mechanism depends on ongoing trading volume — fee income is not guaranteed and will fluctuate.
- Distribution timelines (weekly/annual) are operational targets, not contractual obligations, and may be adjusted as the project matures (e.g. migration to automated on-chain distribution in later phases).
- Regulatory treatment of tokens and token-based rewards varies by jurisdiction and may change.
- Nothing in this document is financial, legal, or tax advice. Do your own research before interacting with $MEMES or any token in the treasury.

---

*This document is a living draft and will be updated as the project evolves. The latest version is always linked from [memecoinssol.xyz](https://memecoinssol.xyz).*
