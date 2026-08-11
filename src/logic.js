class Ship {
  length;
  hit = 0;
  sunk = false;

  constructor(num) {
    this.length = num;
  }

  takeHit() {
    this.hit++;
  }

  isSunk() {
    if (this.hit === this.length) {
      this.sunk = true;
    }
  }
}

function createBoard() {
  const board = [];

  for (let i = 0; i < 10; i++) {
    board.push([]);

    for (let j = 0; j < 10; j++) {
      board[i].push([]);
    }
  }

  return board;
}

function placeShips(coordinates, getBoard) {
  let index = 0;

  for (let index = 0; index < coordinates.length; index++) {
    const column = coordinates[index][0][0];
    const row = coordinates[index][0][1];
    const size = coordinates[index][1];
    const orientation = coordinates[index][2];

    if (column > 10 || row > 10) {
      throw new Error("Out of range. Coordinates must be between 0 and 10.");
    } else {
      const ship = new Ship(size);

      for (let l = 0; l < size; l++) {
        if (orientation === "horizontal") {
          if (column + size > 9) {
            if (getBoard[column - l][row][0] instanceof Ship) {
              throw new Error(`Overlapping ships at ${column - l}, ${row}}`);
            }
            getBoard[column - l][row].push(ship);
          } else {
            if (getBoard[column + l][row][0] instanceof Ship) {
              throw new Error(`Overlapping ships at ${column + l}, ${row}}`);
            }
            getBoard[column + l][row].push(ship);
          }
        }

        if (orientation === "vertical") {
          if (row + size > 9) {
            if (getBoard[column][row - l][0] instanceof Ship) {
              throw new Error(`Overlapping ships at ${column}, ${row - l}`);
            }
            getBoard[column][row - l].push(ship);
          } else {
            if (getBoard[column][row + l][0] instanceof Ship) {
              throw new Error(`Overlapping ships at ${column}, ${row + l}`);
            }
            getBoard[column][row + l].push(ship);
          }
        }
      }
    }
  }
}

class Gameboard {
  board = createBoard();

  getBoard = () => this.board;

  constructor([
    [[a, b], length1, orientation1],
    [[c, d], length2, orientation2],
    [[e, f], length3, orientation3],
    [[g, h], length4, orientation4],
    [[i, j], length5, orientation5],
  ]) {
    this.place = placeShips(
      [
        [[a, b], length1, orientation1],
        [[c, d], length2, orientation2],
        [[e, f], length3, orientation3],
        [[g, h], length4, orientation4],
        [[i, j], length5, orientation5],
      ],
      this.getBoard(),
    );
  }

  receiveAttack(column, row) {
    if (this.board[column][row] == undefined) {
      throw new Error("Out of range. Cooordinates must be between 0 and 10.");
    }

    if (this.board[column][row][0] instanceof Ship) {
      if (this.board[column][row][0].hit != this.board[column][row][0].length) {
        this.board[column][row][0].takeHit();
      }

      if (this.board[column][row][0].hit == this.board[column][row][0].length) {
        this.board[column][row][0].isSunk();
        return this.board[column][row][0].sunk;
      }
    } else {
      this.board[column][row].push("miss");
    }
  }

  allSunk() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j][0] instanceof Ship) {
          if (this.board[i][j][0].sunk === false) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

class Player {
  constructor(input) {
    this.board = new Gameboard(input);
  }
}

function getLastValue(set) {
  let value;
  for (value of set) {
    return value;
  }
}

// computer only targets an area on the board once
function randomMove() {
  const prevColumn = new Set();
  const prevRow = new Set();

  prevColumn.add(Math.floor(Math.random() * 10));
  prevRow.add(Math.floor(Math.random() * 10));

  const column = getLastValue(prevColumn);
  const row = getLastValue(prevRow);

  return {
    column,
    row,
  };
}

export { createBoard, placeShips, Player, Ship, randomMove };
