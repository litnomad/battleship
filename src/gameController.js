import { Ship, randomMove } from "./logic";

function switchTurn(activeplayer) {
  if (activeplayer === "player") {
    player1.classList.remove("active");
    player2.classList.add("active");
  }
  if (activeplayer === "computer") {
    player1.classList.add("active");
    player2.classList.remove("active");
  }
}

function gameOver(player, computer) {
  const body = document.querySelector("body");
  const winText = document.createElement("div");

  player1.className = "inactive";
  player2.className = "inactive";

  if (player.board.allSunk()) {
    winText.textContent = "All battleships are sunk. Player 2 wins!";
  }

  if (computer.board.allSunk()) {
    winText.textContent = "All battleships are sunk. Player 1 wins!";
  }

  body.appendChild(winText);
}

function computerAttack(player, playerBoard) {
  const { column: x, row: y } = randomMove();
  player.board.receiveAttack(x, y);
  console.log(x, y);

  const selector = document.getElementById(`${x}-${y}`);

  if (playerBoard[x][y][0] instanceof Ship) {
    selector.classList.add("hit");
  }
  if (playerBoard[x][y][0] === "miss") {
    selector.textContent = "miss";
  }
}

export { switchTurn, gameOver, computerAttack };
