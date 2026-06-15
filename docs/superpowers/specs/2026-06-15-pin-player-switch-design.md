# PIN-protected player switch — design

Date: 2026-06-15

## Goal

Becoming the **active** player (the one allowed to act) must require a 4-digit
PIN. Each player sets their own PIN; the default is `0000`.

Selecting a hero stays exactly as it is today: clicking a card selects it and
shows that hero's board. NEW: when the selected hero is not the active player, a
**"Switch"** button appears in that hero's box. Clicking it opens a PIN prompt.
Correct PIN makes that hero the active player; wrong PIN shows a message and
lets the user try again.

## Active (operator) vs. selected (target)

Two distinct roles:

- **`selected`** (existing): the card the user clicked. Its board is displayed
  and is the **target** of any action — completed chores, redeemed rewards, etc.
  are credited to the selected hero. Clicking toggles selection. **No PIN.**
- **`active`** (new): the **operator** — the PIN-authenticated person currently
  driving the board (e.g. a parent). Runtime state in `App.jsx`, default `null`,
  held in memory only (resets on page reload).

Once an operator is active, they may act on **any** selected hero's board, and
the action is credited to that **selected** hero. Example: parent authenticates
(active), selects a child (selected), and ticks the child's chores — the chore,
gold, and damage all go to the child.

Gating:

- **No operator active (`active == null`)** → all boards are view-only. To act,
  authenticate via the Switch button + PIN on any hero.
- **Operator active** → the selected hero's board is interactive; actions credit
  the selected hero (which may be the operator themselves or any other hero).

The action handlers already credit `selected` (chore keys, gold, monster damage
are all keyed by `selected`), so only the gate changes — from `selected ===
active` to "an operator is active" (`active != null`).

## Data model

- New field `config.players[].pin`: a 4-character string of digits. Default
  `"0000"`.
- Stored in `config.json` on disk, persisted through the existing `/config`
  save path (no new backend endpoint needed).
- Backward compatibility: existing saved players have no `pin` field. Any
  player without a `pin` is treated as `"0000"` at comparison time
  (`player.pin ?? "0000"`). No migration step required.

Note: player names and PINs are runtime data in `config.json`, not in source.

## Setting the PIN (SetupWizard + Settings)

The setup screen and the Settings screen both reuse `SetupWizard.jsx`, but the
per-player editing UI is duplicated across two code paths, so the PIN input is
added in both:

1. **Wizard per-player step** — `PlayerForm` component
   (`frontend/src/components/SetupWizard.jsx`). Add a PIN field that calls
   `onChange('pin', value)`.
2. **Settings Party tab** — `TabParty` expanded section (same file). Add the
   same PIN field that calls `onUpdatePlayer(i, 'pin', value)`.

`makeNewPlayer` gains `pin: '0000'` so new players start at the default.

PIN input on these setup screens: a single text input, numeric only, max length
4. Setup is a low-friction context, so the multi-box treatment is reserved for
the switch modal. Input is sanitized to digits only. On save, if
the field is not exactly 4 digits it falls back to `0000`.

## Switch button + PIN modal

### Switch button (`PlayerCard.jsx`)

`PlayerCard` gains two props: `isActive` and `onSwitch`. When
`isSelected && !isActive`, render a **"Switch"** button inside the player box.
Clicking it calls `onSwitch(player.id)` (stop propagation so it doesn't also
toggle selection). The button is the only entry point to the PIN prompt.

`selectPlayer(id)` is **unchanged**: it toggles `selected` with no PIN.

### PIN modal (`PinModal.jsx`)

New component `frontend/src/components/PinModal.jsx`.

App-level state in `App.jsx`: `pinTarget` — the id of the player awaiting PIN
entry (`null` when the modal is closed). `onSwitch` sets `pinTarget`.

Modal contents and behavior:

- Four separate single-digit input boxes. Typing a digit auto-advances focus to
  the next box. Backspace moves focus back.
- When the 4th digit is entered, auto-submit (verify immediately). A submit
  button is also acceptable as a fallback.
- Compare entered value against `targetPlayer.pin ?? "0000"`.
  - **Match** → `setActive(pinTarget)` (and select that hero), then close modal
    (`setPinTarget(null)`). An operator is now active, so boards become
    interactive and actions credit whichever hero is selected.
  - **Mismatch** → show error message ("Falscher PIN"), clear all boxes,
    refocus the first box, allow retry.
- Cancel via a close button or backdrop click → close modal, no switch.

## Read-only gating

When no operator is active (`active == null`), boards are view-only:

- Pass a `readOnly` prop to `ChoreGrid`, `RewardGrid`, and the dungeon view so
  claim / redeem / move controls are disabled, with a banner prompting the user
  to authenticate via Switch + PIN.
- Action handlers in `App.jsx` (`claimChore`, `unclaimChore`, `redeemReward`,
  bounty create/claim/cancel, `handlePrestige`, dungeon moves) early-return
  unless an operator is active, as a defense in case a disabled control is
  bypassed. They continue to credit the `selected` hero.

## Error handling

- Wrong PIN: inline error text inside the modal, boxes cleared, focus reset. No
  limit on attempts (out of scope).
- Non-digit input: ignored at the box level (only digits accepted).
- Missing/invalid `pin` on a player object: treated as `"0000"`.

## Out of scope (YAGNI)

- Lockout / cooldown after N failed attempts.
- PIN hashing or encryption — this is a local family app; plaintext in
  `config.json` is acceptable.
- Forcing a PIN change away from the default `0000`.
- Per-action PIN (e.g. confirming a reward) — only the player switch is gated.

## Affected files

| File | Change |
|------|--------|
| `frontend/src/components/SetupWizard.jsx` | PIN input in `PlayerForm` and `TabParty`; `pin: '0000'` in `makeNewPlayer` |
| `frontend/src/components/PinModal.jsx` | New modal component (4 boxes, verify, retry) |
| `frontend/src/components/PlayerCard.jsx` | `isActive` + `onSwitch` props; render "Switch" button when selected and not active |
| `frontend/src/App.jsx` | `active` + `pinTarget` state; `onSwitch` opens modal; render `PinModal`; gate action handlers on `selected === active`; pass `readOnly`/`isActive` to children |
| `frontend/src/components/ChoreGrid.jsx`, `RewardGrid`, dungeon view | Accept `readOnly` to disable action controls |
| `frontend/src/index.css` | Modal, PIN-box, and Switch-button styles |
