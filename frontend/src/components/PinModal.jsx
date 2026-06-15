import React, { useState, useRef, useEffect } from 'react';

// PIN prompt shown when switching the active player.
// Four single-digit boxes with auto-advance; verifies against the target
// player's PIN (default "0000"). On mismatch it clears, shows an error, and
// lets the user retry.
export default function PinModal({ targetPlayer, onSuccess, onCancel }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputs = useRef([]);

  const expected = targetPlayer?.pin ?? '0000';

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  function reset(focusFirst = true) {
    setDigits(['', '', '', '']);
    if (focusFirst) inputs.current[0]?.focus();
  }

  function verify(value) {
    if (value === expected) {
      onSuccess();
    } else {
      setError(true);
      reset();
    }
  }

  function handleChange(idx, raw) {
    const d = raw.replace(/\D/g, '').slice(-1); // keep last typed digit
    setError(false);
    setDigits(prev => {
      const next = [...prev];
      next[idx] = d;
      // Advance focus when a digit was entered
      if (d && idx < 3) inputs.current[idx + 1]?.focus();
      // Auto-submit once all four are filled
      if (idx === 3 && d) {
        const value = next.join('');
        if (value.length === 4) setTimeout(() => verify(value), 0);
      }
      return next;
    });
  }

  function handleKeyDown(idx, e) {
    if (e.key === 'Backspace') {
      if (digits[idx]) {
        setDigits(prev => { const n = [...prev]; n[idx] = ''; return n; });
      } else if (idx > 0) {
        inputs.current[idx - 1]?.focus();
        setDigits(prev => { const n = [...prev]; n[idx - 1] = ''; return n; });
      }
      setError(false);
    } else if (e.key === 'Enter') {
      const value = digits.join('');
      if (value.length === 4) verify(value);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }

  return (
    <div className="pin-overlay" onClick={onCancel}>
      <div className="pin-box" onClick={e => e.stopPropagation()}>
        <div className="pin-title">Wechsel zu {targetPlayer?.name || 'Spieler'}</div>
        <div className="pin-subtitle">PIN eingeben</div>
        <div className="pin-inputs">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => (inputs.current[i] = el)}
              className={`pin-digit${error ? ' error' : ''}`}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
            />
          ))}
        </div>
        {error && <div className="pin-error">Falscher PIN. Nochmal versuchen.</div>}
        <button className="pin-cancel" onClick={onCancel}>Abbrechen</button>
      </div>
    </div>
  );
}
