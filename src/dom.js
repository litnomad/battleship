import { Player } from "./logic.js";
import "./style.css";

function switchPlayer(activeplayer = player) {
  if (activeplayer === player) {
    player1.classList = "inactive";
    player2.classList = "active";
  }
  if (activeplayer === computer) {
    player1.classList = "active";
    player2.classList = "inactive";
  }
}

// player 1 gameboard
// get coordinates
const player = new Player([
  [[0, 8], 3, "horizontal"],
  [[5, 0], 4, "vertical"],
  [[9, 0], 2, "vertical"],
  [[7, 0], 1, "horizontal"],
  [[9, 7], 3, "vertical"],
]);

// get gameboard
const board = player.board.getBoard();

// render gameboard
const player1 = document.querySelector("#player1");

for (let i = 0; i < board.length; i++) {
  const column = document.createElement("div");
  column.setAttribute("id", "col" + i);
  player1.appendChild(column);

  for (let j = 0; j < board[i].length; j++) {
    const row = document.createElement("div");
    row.setAttribute("id", "row" + j);
    column.appendChild(row);

    if (board[i][j].length > 0) {
      row.style.backgroundColor = "grey";
    }

    // click event triggers hit function
    row.addEventListener("click", (event) => {
      console.log(i, j);

      if (row.textContent != "miss") {
        player.board.receiveAttack(i, j);
      }

      if (board[i][j][0] != "miss") {
        board[i][j][0].hit;
        row.style.borderStyle = "dashed";
        row.style.borderColor = "red";
      } else {
        row.textContent = board[i][j][0];
      }

      switchPlayer(player);
    });
  }
}

// player 2 gameboard
// get coordinates
const computer = new Player([
  [[0, 8], 3, "horizontal"],
  [[5, 0], 4, "vertical"],
  [[9, 0], 2, "vertical"],
  [[7, 0], 1, "horizontal"],
  [[9, 7], 3, "vertical"],
]);

// get gameboard
const board2 = computer.board.getBoard();

// render gameboard
const player2 = document.querySelector("#player2");

for (let i = 0; i < board2.length; i++) {
  const column = document.createElement("div");
  column.setAttribute("id", "col" + i);
  player2.appendChild(column);

  for (let j = 0; j < board2[i].length; j++) {
    const row = document.createElement("div");
    row.setAttribute("id", "row" + j);
    column.appendChild(row);

    if (board2[i][j].length > 0) {
      row.style.backgroundColor = "none";
    }

    // click event triggers hit function
    row.addEventListener("click", (event) => {
      console.log(i, j);

      if (row.textContent != "miss") {
        computer.board.receiveAttack(i, j);
      }

      if (board2[i][j][0] != "miss") {
        board2[i][j][0].hit;
        row.style.borderStyle = "dashed";
        row.style.borderColor = "red";
      } else {
        row.textContent = board2[i][j][0];
      }

      switchPlayer(computer);
    });
  }
}
