# PIN-protected player switch — design

Date: 2026-06-15

## Goal

Switching to a non-active player must require a 4-digit PIN. Each player sets
their own PIN; the default is `0000`. Clicking an inactive hero opens a modal
that asks for the PIN. Correct PIN switches to that player. Wrong PIN shows a
message and lets the user try again.

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

## Switch modal (`PinModal.jsx`)

New component `frontend/src/components/PinModal.jsx`.

App-level state in `App.jsx`: `pinTarget` — the id of the player awaiting PIN
entry (`null` when the modal is closed).

`selectPlayer(id)` behavior changes:

- If `id === selected` → deselect the current player (no PIN required).
- Otherwise → `setPinTarget(id)` to open the modal. The switch does **not**
  happen yet.

Modal contents and behavior:

- Four separate single-digit input boxes. Typing a digit auto-advances focus to
  the next box. Backspace moves focus back.
- When the 4th digit is entered, auto-submit (verify immediately). A submit
  button is also acceptable as a fallback.
- Compare entered value against `targetPlayer.pin ?? "0000"`.
  - **Match** → `setSelected(pinTarget)`, then close modal (`setPinTarget(null)`).
  - **Mismatch** → show error message ("Falscher PIN"), clear all boxes,
    refocus the first box, allow retry.
- Cancel via a close button or backdrop click → close modal, no switch.

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
| `frontend/src/App.jsx` | `pinTarget` state; `selectPlayer` opens modal; render `PinModal` |
| `frontend/src/index.css` | Modal + PIN-box styles |
