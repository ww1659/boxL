export const findPlayersInSameGroup = (standings, players, user) => {
  const currentUserStanding = standings.find(
    (standing) => standing.player_id === user.userId
  );
  const groupName = currentUserStanding ? currentUserStanding.group_name : null;

  const playerIdsInGroup = new Set(
    standings
      .filter((standing) => standing.group_name === groupName)
      .map((standing) => standing.player_id)
  );
  const filteredPlayers = players.filter((player) =>
    playerIdsInGroup.has(player.user_id)
  );

  return filteredPlayers;
};
