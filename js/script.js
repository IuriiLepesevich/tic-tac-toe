const cells = document.querySelectorAll(".gameboard>div");

const form = document.querySelector("form");

const Gameboard = (function () {
  const gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let isPlaying = true;
  let turn = "X";
  const Players = [];
  const h1 = document.querySelector(".result");
  let gameNumber = 0;

  const getTurn = () => turn;

  const getGameNumber = () => gameNumber;

  const getPlayers = () => Players;

  const setPlayers = (player1, player2) => {
    Players.push(player1, player2);
  };

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

  const restart = () => {
    h1.textContent = "Game result";
    turn = "X";
    Players.splice(0, Players.length);
    gameboard.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        gameboard[rowIndex][cellIndex] = "";
      });
    });
    isPlaying = true;
    gameNumber = gameNumber + 1;
    renderBoard();
  };

  const endGame = (winner) => {
    isPlaying = false;

    if (winner === "tie") {
      h1.textContent = "Tie!";
    } else {
      h1.textContent = `Player ${winner.getName()} wins!`;
    }
  };

  const checkForWinner = (row, column) => {
    if (
      gameboard[row].every((elem) => elem === turn) ||
      gameboard.every((elem) => elem[column] === turn) ||
      gameboard.every((elem, index) => elem[index] === turn) ||
      gameboard.every((elem, index) => elem[2 - index] === turn)
    ) {
      const winner = Players.filter((player) => player.getSymbol() === turn)[0];
      endGame(winner);
    } else if (gameboard.every((elem) => !elem.includes(""))) endGame("tie");
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
    getPlayers,
    setPlayers,
    restart,
    getGameNumber,
  };
})();

function Player(symbol, name) {
  const playerSymbol = symbol;
  const playerName = name;

  const getSymbol = () => playerSymbol;
  const getName = () => playerName;

  const makeMove = (row, column) => {
    if (Gameboard.getTurn() !== playerSymbol) return;
    Gameboard.updateBoard(row, column);
  };

  return {
    makeMove,
    getSymbol,
    getName,
  };
}

function startGame(event) {
  event.preventDefault();

  Gameboard.restart();

  const name1 = document.querySelector("#playerName1").value;
  const name2 = document.querySelector("#playerName2").value;

  Gameboard.setPlayers(Player("X", name1), Player("0", name2));

  if (Gameboard.getGameNumber() > 1) return;

  cells.forEach((cell) => {
    cell.classList.remove("disabled");
    cell.addEventListener("click", () => {
      const { row } = cell.dataset;
      const { column } = cell.dataset;

      Gameboard.getPlayers()
        .filter((player) => player.getSymbol() === Gameboard.getTurn())[0]
        .makeMove(row, column);
    });
  });
}

form.addEventListener("submit", startGame);
