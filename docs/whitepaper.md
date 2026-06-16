# MEMECOINS ($MEMES) Whitepaper

**Version 0.3 (draft for review)**

> **Early and evolving.** $MEMES is a new, experimental project. This whitepaper is a living document: some features described here are not built yet and are in active development, and details may change often as we improve them for the community and the project. We intend to operate in line with applicable laws and crypto regulations as they develop.

---

## Abstract

Most memecoins follow the same arc: a burst of hype, a price spike, and then silence. Holders are left with a token that has no further reason to exist. $MEMES is built around a different idea: turn ordinary trading activity into an engine that continuously rewards holders with other promising tokens from the pump.fun ecosystem (later, other memecoin ecosystems too, as the community decides). The mechanism starts working from the very first trade.

---

## 1. Introduction

$MEMES is a token launched on **pump.fun** (Solana). Every trade on the bonding curve generates a creator fee. Instead of disappearing into a single wallet, that fee is split 50/50: half funds a **treasury** that buys other pump.fun tokens and redistributes them to $MEMES holders on a weekly basis, and half funds ongoing **development** of the project.

The result is a flywheel: trading activity funds the treasury, the treasury buys tokens, tokens are distributed to holders, holders have more reason to hold and engage, and that drives more trading activity. We call this the **Meme Economy flywheel**.

---

## 2. Fee Mechanism

$MEMES relies entirely on pump.fun's native creator fee. There is no additional tax, no separate buy/sell fee layered on top.

- **Bonding curve (pre-graduation):** creator fee of **0.3%** of trade volume, active **immediately from the first trade**. There is no waiting period or graduation requirement.
- **Post-graduation (PumpSwap):** fees follow pump.fun's tiered structure based on market cap. The rate rises to roughly **0.95%** in mid-range tiers, then tapers down to **0.05%** at very large market caps (98,240+ SOL).
- All fees accrue to the **creator wallet**, the same wallet that launched $MEMES. This wallet is publicly verifiable on-chain at all times.

---

## 3. The 50/50 Split

Every fee payout received by the creator wallet is divided manually by the team at first, while automation is built:

- **50% to Treasury.** Used to buy other pump.fun tokens (at a later stage, all other memecoins if the community decides), which are then distributed to $MEMES holders (see Section 4).
- **50% to Development.** Covers website/infrastructure costs, tooling, design, and continued build-out of the project (portfolio tracker, mobile app, governance tooling, etc.).

Because both the creator wallet and the treasury wallet are public Solana addresses, every split, purchase, and distribution can be independently verified on-chain.

---

## 4. Treasury & Distribution

The treasury holds two categories of tokens, each with its own distribution rules.

### 4.1 Our Pick

Tokens the treasury **buys directly** using trading fees. The community votes on which pump.fun project gets picked next (see Section 5).

- **100% distributed to eligible holders weekly**
- No lock, no cut for the treasury

### 4.2 Collab / Partnership

Tokens **received from official partnerships and collaborations**, not purchased by the treasury, but allocated to $MEMES by partner projects. Selected by the team.

- **50%** distributed weekly to eligible holders, same as Our Pick
- **50%** held by the treasury for **1 year**, then distributed exclusively to **long-term $MEMES holders** (see 4.4) as a loyalty reward

This split rewards the people who stick around. The longer you hold $MEMES, the more of these partner-token pools you become eligible for.

**Why a project would partner with $MEMES:**

- **A path to IRL spending.** Our ecosystem aims to prioritize partner tokens for real-world use through the Fun IRL Hub (gift cards, vouchers, credit), giving a token genuine utility beyond the chart.
- **Extra exposure.** The token is put in front of the $MEMES community and across our channels.
- **Extra daily volume.** Treasury activity and holder interest add ongoing trading volume.
- **Cross-community alignment.** Collaboration fits the idea that legit memes are stronger together, building goodwill across communities.
- **Our long-term holders.** Most importantly, the token reaches an audience of aligned, loyal, long-term holders, not just short-term traders.

### 4.3 Holder Eligibility (anti-gaming)

To receive any weekly distribution, a wallet must hold:

- At least **$10 worth of $MEMES**
- **Continuously** for the 7 days leading up to the distribution **and** at the exact moment of distribution

Eligibility is verified via Helius API snapshots taken at the start of the 7-day window and again at the distribution moment. This prevents wallets from buying in right before a snapshot, collecting a reward, and immediately selling.

### 4.4 Long-Term Holder Reward

The 1-year-locked portion of Collab/Partnership tokens (Section 4.2) is reserved for **long-term holders**: wallets that have held $MEMES **continuously for 1+ year**, tracked via ongoing Helius snapshots. When the lock period for a given partner-token allocation ends, that pool is distributed exclusively among qualifying long-term holders.

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

- **Platform:** [Realms](https://realms.today) (SPL Governance), on-chain and auditable voting
- **Subject:** which pump.fun token becomes the next "Our Pick"
- **Weighting:** voting power is proportional to **$MEMES held** (token-weighted), rather than one vote per wallet
- **Cost:** effectively free, only the base Solana transaction fee
- **Future:** later phases will evaluate a custom on-chain program for fairer governance that reduces the influence of very large holders on individual votes

---

## 6. Tokenomics

| Field | Value |
|---|---|
| Token | $MEMES |
| Blockchain | Solana |
| Launch platform | pump.fun |
| Contract Address | TBA at launch |
| Team Allocation | TBA |
| Community | 100%, fair launch, no presale |

All tokenomics figures will be finalized and locked at launch and reflected on [memecoinssol.xyz](https://memecoinssol.xyz).

---

## 7. The Fun IRL Hub

$MEMES starts with on-chain rewards, but the longer-term vision goes further: bringing memecoins into everyday life.

Memecoins are one of the largest and most active communities in crypto, and crypto is steadily becoming a normal way to pay for things. The Fun IRL Hub aims to connect those two ideas, giving $MEMES holders a path to turn their rewards into real-world fun.

Early focus areas being explored include:

- **Gaming:** credit and gift cards for popular gaming platforms
- **Cinema:** tickets and vouchers
- **Theme parks:** passes and experiences
- **Sports:** tickets and merch

The Fun IRL Hub is not limited to $MEMES alone. Part of the vision is to bring memecoin communities together, so holders across different projects can put their holdings to real-world use, with $MEMES as the hub that makes it possible.

Specifics such as partners, supported categories, and how redemption works are in active development and will be detailed as they are finalized. The Fun IRL Hub is a Phase 3 initiative (see Roadmap).

---

## 8. Roadmap

**Phase 1: Launch**
- Token launch on pump.fun
- Website live (memecoinssol.xyz)
- Whitepaper
- Telegram community
- X growth campaign

**Phase 2: Ecosystem**
- First treasury buys
- Holder distribution system live (eligibility tracking, claim portal)
- Community building
- Partner project onboarding (Collab/Partnership category)

**Phase 3: Expansion**
- CEX listings
- DAO governance (custom voting program)
- Fun IRL Hub: turn memecoins into real-world fun (gift cards, vouchers, credit)
- Launchpad for vetted pump.fun projects
- Cross-chain expansion

---

## 9. Risks & Disclaimer

$MEMES is an experimental token built on a public, permissionless launch platform. As with any crypto asset:

- Token prices are highly volatile and can go to zero.
- The treasury mechanism depends on ongoing trading volume. Fee income is not guaranteed and will fluctuate.
- Distribution timelines (weekly/annual) are operational targets, not contractual obligations, and may be adjusted as the project matures (e.g. migration to automated on-chain distribution in later phases).
- Regulatory treatment of tokens and token-based rewards varies by jurisdiction and may change. We intend to follow the applicable laws and crypto regulations in the places where the project operates, and to adapt as those rules evolve.
- Some features described in this document are still in development and may change, ship later, or not ship at all.
- Nothing in this document is financial, legal, or tax advice. Do your own research before interacting with $MEMES or any token in the treasury.

---

*This document is a living draft and will be updated as the project evolves. The latest version is always linked from [memecoinssol.xyz](https://memecoinssol.xyz).*
