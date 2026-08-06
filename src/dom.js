import { switchPlayer, computerAttacks, Player, playerTurn } from "./logic.js";
import "./style.css";

// get player 1's coordinates
const player = new Player([
  [[0, 8], 3, "horizontal"],
  [[5, 0], 4, "vertical"],
  [[9, 0], 2, "vertical"],
  [[7, 0], 1, "horizontal"],
  [[9, 7], 3, "vertical"],
]);

// render player 1 gameboard
const player1 = document.querySelector("#player1");
const board = player.board.getBoard();

for (let i = 0; i < board.length; i++) {
  const column = document.createElement("div");
  column.setAttribute("id", "col" + i);
  player1.appendChild(column);

  for (let j = 0; j < board[i].length; j++) {
    const row = document.createElement("div");
    row.setAttribute("id", "row" + i + j);
    column.appendChild(row);

    if (typeof board[i][j][0] === "object") {
      row.style.backgroundColor = "grey";
    }
  }
}

// get player 2's coordinates
const computer = new Player([
  [[0, 8], 3, "horizontal"],
  [[5, 0], 4, "vertical"],
  [[9, 0], 2, "vertical"],
  [[7, 0], 1, "horizontal"],
  [[9, 7], 3, "vertical"],
]);

// render player 2 gameboard
const player2 = document.querySelector("#player2");
const board2 = computer.board.getBoard();

for (let i = 0; i < board2.length; i++) {
  const column = document.createElement("div");
  column.setAttribute("id", "col" + i);
  player2.appendChild(column);

  for (let j = 0; j < board2[i].length; j++) {
    const row = document.createElement("div");
    row.setAttribute("id", "row" + i + j);
    column.appendChild(row);

    if (typeof board2[i][j][0] === "object") {
      row.style.backgroundColor = "none";
    }

    row.addEventListener("click", (event) => {
      if (player2.classList.contains("active")) {
        console.log(i, j);

        if (row.textContent != "miss") {
          computer.board.receiveAttack(i, j);
        }

        if (typeof board2[i][j][0] === "object") {
          row.style.borderColor = "red";
          row.style.borderStyle = "dashed";

          board2[i][j][0].hit;
        } else {
          row.textContent = board2[i][j][0];
        }

        playerTurn("computer");

        // computer automatically attacks after player's turn
        const x = computerAttacks().column;
        const y = computerAttacks().row;
        console.log(x, y);
        player.board.receiveAttack(x, y);

        const playerBoard = document.querySelector(`#row${x}${y}`);

        if (player.board.getBoard()[x][y][0] == "miss") {
          playerBoard.textContent = "miss";
        } else if (player.board.getBoard()[x][y][0].length > 0) {
          playerBoard.style.borderStyle = "dashed";
          playerBoard.style.borderColor = "red";
        }

        playerTurn("player");
      }
    });
  }
}
