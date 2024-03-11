export const checkTiebreak = (score) => {
  const regex = /^[0-7]-[0-7]$/;

  if (regex.test(score)) {
    const [player1Score, player2Score] = score.split("-");

    const p1 = parseInt(player1Score);
    const p2 = parseInt(player2Score);

    if ((p1 === 6 && p2 === 7) || (p1 === 7 && p2 === 6)) {
      return true;
    }
  }

  return false;
};
