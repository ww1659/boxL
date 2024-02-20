export const validateThirdSetScore = (score) => {
  const regex = /^[0-7]-[0-6]$/;

  if (regex.test(score)) {
    const [player1Score, player2Score] = score.split("-");

    const p1 = parseInt(player1Score);
    const p2 = parseInt(player2Score);

    if (p1 >= 0 && p1 <= 7 && p2 >= 0 && p2 <= 7) {
      if (
        (p1 === 6 && p2 >= 0 && p2 <= 4) ||
        (p1 === 7 && (p2 === 5 || p2 === 6))
      ) {
        return true;
      }
    }
  }

  return false;
};
