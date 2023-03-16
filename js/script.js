const cells = document.querySelectorAll(".gameboard>div");

const Gameboard = (function () {
  const gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let isPlaying = true;

  let turn = "X";

  const getTurn = () => turn;

  const renderBoard = () => {
    gameboard.forEach((row, rowIndex) => {
      row.forEach((elem, columnIndex) => {
        const cell = document.querySelector(
          `[data-row="${rowIndex + 1}"][data-column="${columnIndex + 1}"]`
        );
        cell.textContent = elem;
      });
    });
  };

  const endGame = (winner) => {
    const h1 = document.querySelector(".result");
    isPlaying = false;

    if (winner === "tie") {
      h1.textContent = "Tie!";
    } else {
      h1.textContent = `Player ${winner} wins!`;
    }
  };

  const checkForWinner = (row, column) => {
    if (gameboard.every((elem) => !elem.includes(""))) endGame("tie");

    if (
      gameboard[row].every((elem) => elem === turn) ||
      gameboard.every((elem) => elem[column] === turn) ||
      gameboard.every((elem, index) => elem[index] === turn) ||
      gameboard.every((elem, index) => elem[2 - index] === turn)
    )
      endGame(turn);
  };

  const updateBoard = (row, column) => {
    const arrRow = row - 1;
    const arrColumn = column - 1;
    if (gameboard[arrRow][arrColumn] || !isPlaying) return;

    gameboard[arrRow][arrColumn] = turn;
    renderBoard();
    checkForWinner(arrRow, arrColumn);
    turn = turn === "X" ? "0" : "X";
  };

  return {
    updateBoard,
    renderBoard,
    getTurn,
  };
})();
