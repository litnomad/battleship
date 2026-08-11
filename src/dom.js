import { Player, Ship, randomMove } from "./logic.js";
import { switchTurn, gameOver, computerAttack } from "./gameController.js";
import "./style.css";

const confirmBtn = document.querySelector("#confirmBtn");

// get player 1 and player 2 coordinates
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const ship1Col = Number(document.querySelector("#ship1-col").value);
  const ship1Row = Number(document.querySelector("#ship1-row").value);
  const ship1Size = Number(document.querySelector("#ship1-size").value);
  const ship1Dir = document.querySelector("#ship1-dir").value;

  const ship2Col = Number(document.querySelector("#ship2-col").value);
  const ship2Row = Number(document.querySelector("#ship2-row").value);
  const ship2Size = Number(document.querySelector("#ship2-size").value);
  const ship2Dir = document.querySelector("#ship2-dir").value;

  const ship3Col = Number(document.querySelector("#ship3-col").value);
  const ship3Row = Number(document.querySelector("#ship3-row").value);
  const ship3Size = Number(document.querySelector("#ship3-size").value);
  const ship3Dir = document.querySelector("#ship3-dir").value;

  const ship4Col = Number(document.querySelector("#ship4-col").value);
  const ship4Row = Number(document.querySelector("#ship4-row").value);
  const ship4Size = Number(document.querySelector("#ship4-size").value);
  const ship4Dir = document.querySelector("#ship4-dir").value;

  const ship5Col = Number(document.querySelector("#ship5-col").value);
  const ship5Row = Number(document.querySelector("#ship5-row").value);
  const ship5Size = Number(document.querySelector("#ship5-size").value);
  const ship5Dir = document.querySelector("#ship5-dir").value;

  const player = new Player([
    [[ship1Col, ship1Row], ship1Size, ship1Dir],
    [[ship2Col, ship2Row], ship2Size, ship2Dir],
    [[ship3Col, ship3Row], ship3Size, ship3Dir],
    [[ship4Col, ship4Row], ship4Size, ship4Dir],
    [[ship5Col, ship5Row], ship5Size, ship5Dir],
  ]);

  const computer = new Player([
    [[0, 8], 3, "horizontal"],
    [[5, 0], 4, "vertical"],
    [[9, 0], 2, "vertical"],
    [[7, 0], 1, "horizontal"],
    [[9, 7], 3, "vertical"],
  ]);

  render(player, computer);
});

// alerts if error is thrown for overlapping ships
window.addEventListener("error", (event) => {
  if (event.message) {
    alert(`${event.message}. Please choose another coordinate.`)
  }
})

function render(player, computer) {
  // render player 1 gameboard
  const player1 = document.querySelector("#player1");
  const board1 = player.board.getBoard();

  // reset for each confirm
  player1.innerHTML = "";

  for (let i = 0; i < board1.length; i++) {
    const column = document.createElement("div");
    column.setAttribute("id", "col" + i);
    player1.appendChild(column);

    for (let j = 0; j < board1[i].length; j++) {
      const row = document.createElement("div");
      row.setAttribute("id", i + "-" + j);
      column.appendChild(row);

      if (board1[i][j][0] instanceof Ship) {
        row.style.backgroundColor = "grey";
      }
    }
  }

  // render player 2 gameboard
  const player2 = document.querySelector("#player2");
  const board2 = computer.board.getBoard();

  // reset for each confirm
  player2.innerHTML = "";

  for (let i = 0; i < board2.length; i++) {
    const column = document.createElement("div");
    column.setAttribute("id", "col" + i);
    player2.appendChild(column);

    for (let j = 0; j < board2[i].length; j++) {
      const row = document.createElement("div");
      row.setAttribute("id", i + "-" + j);
      column.appendChild(row);

      row.addEventListener("click", (event) => {
        if (player2.classList.contains("active")) {
          if (row.textContent !== "miss" && !row.classList.contains("hit")) {
            computer.board.receiveAttack(i, j);
          }
          if (board2[i][j][0] instanceof Ship) {
            row.classList.add("hit");
          }
          if (board2[i][j][0] === "miss") {
            row.textContent = "miss";
          }

          if (player.board.allSunk() || computer.board.allSunk()) {
            gameOver(player, computer);
          } else {
            switchTurn("computer");

            computerAttack(player, board1);

            switchTurn("player");
          }
        }
      });
    }
  }
}
