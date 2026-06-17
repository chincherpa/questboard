import React from 'react';
import { getChoresFor, choreDoneKey, isChoreDoneForPlayer, getChoreClaimant } from '../logic';
import TileSprite from './TileSprite';

function dmgClass(p) {
  if (p <= 1) return 'pts-1';
  if (p === 2) return 'pts-2';
  if (p === 3) return 'pts-3';
  if (p === 4) return 'pts-4';
  if (p === 5) return 'pts-5';
  return 'pts-6';
}

function ChoreCard({ chore, players, dailyDone, weeklyDone, monthlyDone, selectedPlayerId, onClaim, onUnclaim, bonusChoreId, readOnly }) {
  const store = chore.freq === 'daily' ? dailyDone : chore.freq === 'weekly' ? weeklyDone : monthlyDone;
  const isDone = isChoreDoneForPlayer(store, chore, selectedPlayerId);
  const claimedById = getChoreClaimant(store, chore, selectedPlayerId);
  const dp = claimedById ? players.find(p => p.id === claimedById) : null;
  const canUndo = isDone && claimedById === selectedPlayerId;

  function handleClick() {
    if (readOnly) return;
    if (isDone) {
      if (canUndo) onUnclaim(chore.id);
    } else {
      onClaim(chore.id);
    }
  }

  return (
    <div
      className={`chore ${chore.freq}${isDone ? ' done' : ''}${canUndo ? ' undoable' : ''}${chore.id === bonusChoreId ? ' bonus' : ''}`}
      onClick={handleClick}
      title={canUndo ? 'Zum Rückgängigmachen tippen' : undefined}
    >
      <div className="chore-top">
        <TileSprite tile={chore.icon} scale={2} />
        {chore.id === bonusChoreId && <span className="bonus-badge">⭐2x</span>}
        <span className={`pts-badge ${dmgClass(chore.pts)}`}>
          <TileSprite tile={118} display={10} />
          {chore.pts}
        </span>
      </div>
      <div className="chore-name">{chore.name}{chore.mode === 'solo' && <span className="solo-badge">1P</span>}</div>
      {isDone && (
        <div className="done-by">{canUndo ? '↩ undo' : `✔ ${dp ? dp.name : 'erledigt'}`}</div>
      )}
    </div>
  );
}

export default function ChoreGrid({ player, players, activeChores, dailyDone, weeklyDone, monthlyDone, onClaimChore, onUnclaimChore, bonusChoreId, readOnly }) {
  const chores = getChoresFor(player, activeChores);
  const byName  = (a, b) => a.name.localeCompare(b.name);
  const daily   = chores.filter(c => c.freq === 'daily').sort(byName);
  const weekly  = chores.filter(c => c.freq === 'weekly').sort(byName);
  const monthly = chores.filter(c => c.freq === 'monthly').sort(byName);

  const cardProps = {
    players,
    selectedPlayerId: player?.id,
    dailyDone,
    weeklyDone,
    monthlyDone: monthlyDone || {},
    onClaim: onClaimChore,
    onUnclaim: onUnclaimChore,
    bonusChoreId,
    readOnly,
  };

  return (
    <div className={`chore-sections${readOnly ? ' read-only' : ''}`}>
      {readOnly && (
        <div className="readonly-banner">👁 Nur Ansicht — tippe „🔒 Switch" bei einem Helden und gib den PIN ein, um Aufgaben abzuhaken.</div>
      )}
      <div>
        <div className="section-label">
          <TileSprite tile={118} display={12} />
          Tägliche Quests
          <span className="reset-info">— Reset um Mitternacht</span>
        </div>
        <div className="chores">
          {daily.map(c => <ChoreCard key={c.id} chore={c} {...cardProps} />)}
        </div>
      </div>
      {weekly.length > 0 && (
        <div>
          <div className="section-label">
            <TileSprite tile={131} display={12} />
            Wöchentliche Quests
            <span className="reset-info">— Reset am Sonntag</span>
          </div>
          <div className="chores">
            {weekly.map(c => <ChoreCard key={c.id} chore={c} {...cardProps} />)}
          </div>
        </div>
      )}
      {monthly.length > 0 && (
        <div className="monthly-section">
          <div className="section-label">
            <TileSprite tile={72} display={12} />
            Monatliche Quests
            <span className="reset-info">— Reset am 1. des Monats</span>
          </div>
          <div className="chores">
            {monthly.map(c => <ChoreCard key={c.id} chore={c} {...cardProps} />)}
          </div>
        </div>
      )}
    </div>
  );
}
