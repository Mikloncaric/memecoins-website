# Decisions Log

Chronological log of all key project decisions.

---

## 2026-06-09

### Platforma za launch
**Odluka:** AnonCoin (anoncoin.it), ne PumpFun  
**Razlog:** Strateški — dobiti support od AnonCoin official tima

### AnonCoin prioritet
**Odluka:** Utility fokusiran isključivo na AnonCoin ekosustav  
**Razlog:** Lakše dobiti AnonCoin team support ako smo AnonCoin-first  
**Napomena:** Možda proširiti na druge platforme u budućnosti, ali nije prioritet

### Domena
**Odluka:** memecoinssol.com  
**Razlog:** ~$10/god, jasno identificira projekt i chain (Solana)  
**Registrar:** Namecheap ili Cloudflare (odabir TBD)

### Hosting
**Odluka:** GitHub Pages (besplatno)  
**Razlog:** Repo već postavljen, auto-deploy na svaki push, SSL uključen

### Boje (Color Psychology)
**Odluka:** Crveni CTA gumbi (#E63946), teal akcent (#0AA89E), zlatna (#C9A227)  
**Razlog:** Istraživanje — crveni CTAs +34% konverzija, teal = povjerenje + rast

### Treasury — distribucija
**Odluka:** Tjedno, split 25% locked 1 god / 75% liquid holderima  
**Alati:** Streamflow (vesting + claim portal), Helius API (snapshot)  
**Trošak:** ~1 SOL prva 3 mj

### Treasury — voting
**Odluka:** On-chain, Realms (SPL Governance) u Phase 1, custom 1-wallet-1-vote program u Phase 2  
**Glasanje:** 1 wallet = 1 glas (cilj), za sada token-weighted dok ne izgradimo custom program

### Treasury — eligibility
**Odluka:** Minimum $10 worth of $MEME u walletu za distribuciju  
**Verifikacija:** Helius API snapshot prije svake distribucije

### Treasury — kategorije
**Odluka:** Dvije kategorije — Collab/Partnership (team pick) i Our Pick (community vote)

### Workflow pravilo
**Odluka:** Završiti tekući zadatak prije prihvaćanja novog  
**Razlog:** Fokus i kvaliteta outputa

### Repo struktura
**Odluka:** Jedan repo, dvije mape — website u korijenu, projektne bilješke u /docs  
**Razlog:** Sve na jednom mjestu, verzioniranje svega

---

## 2026-06-10

### Platforma za launch — promjena odluke
**Odluka:** Prebacujemo s AnonCoin na **pump.fun**  
**Razlog:** AnonCoin ima premalo aktivnih coinova. Pump.fun je dominantna Solana launchpad platforma (~50-70% market share), a creator fee (0.3% na bonding curveu) aktivan je odmah od lansiranja — bez čekanja na graduation kao kod AnonCoina (420 SOL).  
**Posljedice:** Sve reference na AnonCoin u index.html, treasury.html i treasury.js zamijenjene s pump.fun (kao launch platforma i kao kategorija tokena koje treasury kupuje). Fee info bar na indexu više ne prikazuje konkretne postotke/pragove — live stranica ne treba te brojke.

### Treasury — distribucija po kategorijama (promjena)
**Odluka:** Split sad ovisi o kategoriji — "Our Pick" (tokeni koje treasury kupuje) = 100% holderima, bez locka. "Collab/Partnership" (tokeni od partnera) = 75% holderima, 25% trajno drži MEMECOINS treasury.  
**Razlog:** Trajno držanje partnerskih tokena signalizira partnerima dugoročnu posvećenost — kako MEMECOINS community raste, raste i potražnja za njihovim tokenom.  
**Posljedice:** Generic "25% Locked (1 god) / 75% Distributed" distribution bar uklonjen s treasury.html (split je sad prikazan po kategoriji u opisu). Streamflow vesting contract više nije potreban — 25% partnerskih tokena jednostavno ostaje u treasury walletu.
