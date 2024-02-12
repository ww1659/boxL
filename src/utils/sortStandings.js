export const sortStandings = (standings, results) => {
  const headToHeadStats = calculateHeadToHead(results);
  return standings.slice().sort((a, b) => customSort(a, b, headToHeadStats));
};

function customSort(a, b, headToHeadStats) {
  const ptsA = a.wins * 2;
  const ptsB = b.wins * 2;

  if (ptsA !== ptsB) {
    return ptsB - ptsA;
  }

  const headToHeadA = headToHeadStats[a.player_id];
  const headToHeadB = headToHeadStats[b.player_id];
  if (headToHeadA !== headToHeadB) {
    return headToHeadB - headToHeadA;
  }

  const setPercentageA = (a.setsWon / (a.setsWon + a.setsLost)) * 100;
  const setPercentageB = (b.setsWon / (b.setsWon + b.setsLost)) * 100;
  if (setPercentageA !== setPercentageB) {
    return setPercentageB - setPercentageA;
  }

  const gamePercentageA = (a.gamesWon / (a.gamesWon + a.gamesLost)) * 100;
  const gamePercentageB = (b.gamesWon / (b.gamesWon + b.gamesLost)) * 100;
  if (gamePercentageA !== gamePercentageB) {
    return gamePercentageB - gamePercentageA;
  }

  return 0;
}

function calculateHeadToHead(results) {
  const headToHead = {};

  results.forEach((result) => {
    const { winner_id, loser_id } = result;

    // Initialize head-to-head records for winner and loser if not present
    if (!headToHead[winner_id]) {
      headToHead[winner_id] = {};
    }
    if (!headToHead[loser_id]) {
      headToHead[loser_id] = {};
    }

    // Update head-to-head records
    headToHead[winner_id][loser_id] =
      (headToHead[winner_id][loser_id] || 0) + 1;
    headToHead[loser_id][winner_id] =
      (headToHead[loser_id][winner_id] || 0) - 1;
  });

  return headToHead;
}
