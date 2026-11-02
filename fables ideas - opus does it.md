# Questboard: Drei neue Features — Wochenboss, Statistik-Tab, Haustiere

## Context

Questboard ist ein Pixel-RPG-Chore-Tracker für Familien (React-Frontend, FastAPI als reiner JSON-Store, gesamte Spiellogik client-seitig in `frontend/src/`). Analyse ergab drei Lücken, die der User bestätigt hat:

1. **Wochenboss (Familien-Raid)** — es gibt kein Koop-Element; jeder kämpft nur gegen sein eigenes Tagesmonster.
2. **Statistik-Tab** — `state.history` sammelt alle Events (chore/gold/penalty/reward/loot/badge/bounty mit `ts`, `player`, `pts`), aber es gibt keine Auswertung.
3. **Haustier-System** — Gold hat außer Rewards keine dauerhafte Senke; Kids-Motivation.

Entschieden (User): Pet statt Ausrüstung; Raid-Reward = Gold-Bonus für alle, skaliert nach Schadensanteil; Statistik als **eigener Tab**.

## Bestehende Bausteine (wiederverwenden)

 - `dateSeededMonster()` / `weekKey()` in [frontend/src/logic.js](frontend/src/logic.js) — Seed-Muster für den Wochenboss
 - `applyAutoResets()` in [frontend/src/App.jsx](frontend/src/App.jsx) — Tages-/Wochen-Reset-Hook für Raid-Reset und Pet-Tagespflege
 - `claimChore()` in App.jsx — zentrale Stelle, an der Raid-Schaden und Pet-XP/Boni andocken
 - `MONSTER_SPRITES` ([monsterSprites.js](frontend/src/monsterSprites.js)) + `MonsterSprite` — Boss-Darstellung ohne neue Assets
 - `HpSegBar`-Muster aus [PlayerCard.jsx](frontend/src/components/PlayerCard.jsx) — Boss-HP-Leiste
 - History-Rendering-Muster aus [HistoryTab.jsx](frontend/src/components/HistoryTab.jsx)
- Tab-Muster im App.jsx-Header (`currentTab`), Toast, `playFanfare`/`Celebration`

## Feature 1: Wochenboss (Familien-Raid)

**Konzept:** Ein gemeinsames Tier-5-Monster pro Woche, geseedet mit `weekKey`. Jede normale Aufgabe fügt dem Boss denselben `actualPts`-Schaden zu wie dem Tagesmonster (keine extra Klicks). Fällt der Boss vor Wochenende: Gold-Bonus für alle nach Schadensanteil.

**Daten/Logik (`logic.js`, `data.js`):**
- `weekSeededRaidBoss(weekKey, players)` — wählt Tier-5-Monster aus `MONSTERS`, `maxHP = Σ RAID_HP_QUOTA[player.mode]` (neue Konstanten in data.js, Startwerte: kids 30, adults 55 — bewusst tunable)
- `RAID_GOLD_POOL_PER_PLAYER = 12` — Gesamtpool = 12 × Spielerzahl; Auszahlung `round(pool × eigenerSchaden/gesamtSchaden)`, Minimum 2g für jeden, der ≥1 Schaden gemacht hat

**State (neu in `makeDefaultState`):** `raid: { weekKey, damage: {playerId: n}, defeated: false, rewardPaid: false }`

**Integration:**
- `claimChore()` (App.jsx): bei jedem Nicht-Overkill-Hit `raid.damage[selected] += actualPts`; bei Kill → `defeated`, Gold-Auszahlung, History-Einträge `type: 'raid_kill'`, `playFanfare()` + `Celebration`
- `applyAutoResets()`: bei `weekKey`-Wechsel Raid neu initialisieren (kein Penalty bei Nicht-Kill — bewusst positiv gehalten)
- HistoryTab: neuer Case `raid_kill` („half beim Raid-Sieg gegen X (+Ng)")

**UI:** Neue Komponente `frontend/src/components/RaidBanner.jsx` — schmales Banner zwischen Header und Spielerkarten: Boss-Sprite (`MonsterSprite`), Name „Wochenboss: …", gemeinsame Segment-HP-Leiste, kleine Schadensanteile pro Spieler. Bei Sieg: Banner zeigt „Besiegt! ✓" bis Wochenende.

## Feature 2: Statistik-Tab

**UI:** Neuer Tab „Statistik" im Header (App.jsx), neue Komponente `frontend/src/components/StatsTab.jsx`. Reine CSS-Balken (Pixel-Stil, keine Chart-Lib), Klassen in `index.css`.

**Inhalte (alles aus `state.history` berechnet, `useMemo`):**
- **Gold pro Woche** (letzte 6 Wochen): gestapelte/gruppierte Balken pro Spieler aus `type: 'gold' | 'chore' | 'loot'`-Einträgen (`ts` → Woche via `weekKey`-Logik)
- **Aufgaben-Heatmap:** 7 Wochentage × Spieler, Zellintensität = Anzahl `chore`-Einträge (letzte 8 Wochen)
- **Totale:** Monster besiegt, Aufgaben erledigt, Krits, Strafen — pro Spieler als Kartenzeile
- **Top-Aufgaben:** je Spieler die 3 häufigsten `h.name` aus chore-Einträgen
- **Wochen-Rangliste** zieht von HistoryTab hierher um (HistoryTab wird rein chronologisch)

**Nebenbei (Hygiene):** `history` wächst unbegrenzt — beim Tagesreset in `applyAutoResets()` auf die letzten 2000 Einträge kappen.

## Feature 3: Haustiere

**Konzept:** Spieler kauft im Shop ein Ei (25g). Pet-XP = +1 pro erledigter Aufgabe. Stufen: Ei (schlüpft bei 5 XP) → Baby (halber Bonus) → Erwachsen (ab 30 XP, voller Bonus). Ein Pet pro Spieler. Emoji-Darstellung, keine neuen Assets.

**Daten (`data.js`):**
```js
export const PETS = [
  { id: 'drache',  name: 'Drache',  egg: '🥚', baby: '🐣', adult: '🐲', bonus: 'gold',  desc: '+10% Gold bei Monster-Kills' },
  { id: 'katze',   name: 'Glückskatze', …,      adult: '🐈', bonus: 'luck',  desc: '+5% Glücksfund-Chance' },
  { id: 'wolf',    name: 'Wolf', …,             adult: '🐺', bonus: 'crit',  desc: '+3% Krit-Chance' },
  { id: 'eule',    name: 'Eule', …,             adult: '🦉', bonus: 'xp',    desc: '+1 EP pro Monster-Kill' },
];
export const PET_EGG_COST = 25;
export const PET_HATCH_XP = 5;
export const PET_ADULT_XP = 30;
```

**State:** `pets: { [playerId]: { id, xp } }` (in `makeDefaultState` + `handleEditComplete`-`keep()`)

**Logik (`logic.js`):** `getPetStage(xp)`, `getPetBonus(pet)` → `{ goldMult, luckAdd, critAdd, xpAdd }` (Baby = 50%). In `claimChore()`: Boni auf `critChanceForLevel`-Ergebnis, `luck`, Kill-Gold und XP anwenden; Pet-XP +1 pro Chore.

**UI:**
- `RewardGrid.jsx`: neuer Abschnitt „Tiergehege" — Ei-Auswahl (Pet-Typ beim Kauf wählen), ausgegraut wenn Spieler schon Pet hat oder Gold < 25
- `PlayerCard.jsx`: Pet-Emoji neben Badges mit Tooltip (Name, Stufe, XP-Fortschritt, Bonus) — `BadgeTooltip`-Muster wiederverwenden
- History: `type: 'pet_buy'`, `type: 'pet_hatch'`, `type: 'pet_adult'`-Einträge + Toast bei Stufenaufstieg

## Reihenfolge & Dateien

1. **Statistik-Tab** (isoliert, kein State-Schema-Change): `StatsTab.jsx` (neu), `App.jsx`, `HistoryTab.jsx`, `index.css`
2. **Wochenboss:** `data.js`, `logic.js`, `App.jsx` (`makeDefaultState`, `applyAutoResets`, `claimChore`), `RaidBanner.jsx` (neu), `HistoryTab.jsx`, `index.css`
3. **Haustiere:** `data.js`, `logic.js`, `App.jsx` (`claimChore`, State), `RewardGrid.jsx`, `PlayerCard.jsx`, `HistoryTab.jsx`, `index.css`

Backend: **keine Änderungen** nötig (speichert beliebiges JSON).

Alte Spielstände: alle neuen State-Felder defensiv lesen (`state.raid ?? init`, `state.pets ?? {}`) — `applyAutoResets` merged bereits `makeDefaultState`, das reicht.

## Verifikation

1. `cd frontend && pnpm dev` + `uvicorn main:app --reload --port 5050` (backend)
2. Per Playwright-Browser durchklicken:
   - Aufgabe abschließen → Raid-Banner-HP sinkt, Tagesmonster-HP sinkt
   - Boss totklicken → Gold-Auszahlung nach Anteil, Fanfare, History-Eintrag
   - Ei kaufen → Gold −25, Ei auf Karte; 5 Aufgaben → schlüpft (Toast); Bonus-Wirkung stichprobenartig via Toast-Werte
   - Statistik-Tab → Balken/Heatmap plausibel gegen Verlauf
3. Simulierter Wochenwechsel: `weekKey` im gespeicherten State manipulieren, App neu laden → Raid resettet, kein Crash mit altem Spielstand (Import eines Backups ohne neue Felder testen)
4. `pnpm build` läuft fehlerfrei
