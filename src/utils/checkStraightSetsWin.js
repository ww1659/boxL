export const checkStraightSets = (firstSetScore, secondSetScore) => {
  const [firstSetPlayer1, firstSetPlayer2] = firstSetScore.split("-");
  const [secondSetPlayer1, secondSetPlayer2] = secondSetScore.split("-");
  const player1WinsFirstTwoSets =
    parseInt(firstSetPlayer1) > parseInt(firstSetPlayer2) &&
    parseInt(secondSetPlayer1) > parseInt(secondSetPlayer2);
  const player2WinsFirstTwoSets =
    parseInt(firstSetPlayer1) < parseInt(firstSetPlayer2) &&
    parseInt(secondSetPlayer1) < parseInt(secondSetPlayer2);

  if (player1WinsFirstTwoSets || player2WinsFirstTwoSets) {
    return true;
  } else {
    return false;
  }
};
