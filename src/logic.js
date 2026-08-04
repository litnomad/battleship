class Ship {
  hit = 0;
  sunk = false;
  length;

  constructor(length) {
    this.length = length;
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

  // create rows
  for (let i = 0; i < 10; i++) {
    board.push([]);

    // create columns
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

      // horizontal orientation
      for (let l = 0; l < size; l++) {
        if (orientation == "horizontal") {
          if (column + size > 9) {
            // push reference
            getBoard[column - l][row].push(ship);
          } else {
            getBoard[column + l][row].push(ship);
          }
        }

        // vertical orientation
        if (orientation == "vertical") {
          if (row + size > 9) {
            getBoard[column][row - l].push(ship);
          } else {
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
    this.map = placeShips(
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

    // no action if already a miss
    if (this.board[column][row].length > 0) {
      if (this.board[column][row][0].hit != this.board[column][row][0].length) {
        this.board[column][row][0].takeHit();
        console.log(this.board[column][row][0]);
      }

      if (this.board[column][row][0].hit == this.board[column][row][0].length) {
        this.board[column][row][0].isSunk();
        return this.board[column][row][0].sunk;
      }
    } else {
      this.board[column][row].push("miss");
      console.log(this.board[column][row][0]);
    }
  }

  sunk() {
    if (this.board.every(this.ship.sunk() === true)) {
      return true;
    }
    return false;
  }
}

class Player {
  constructor(array) {
    // prevent overlapping ships
    for (let i = 0, j = i + 1; i < array.length; i++, j++) {
      let index = j;
      while (index < array.length) {
        let col1 = array[i][0][0];
        let col2 = array[index][0][0];
        let dir1 = array[i][2];
        let dir2 = array[index][2];
        if (col1 == col2 && dir1 == dir2) {
          let row1 = array[i][0][1];
          let row2 = array[index][0][1];
          let length1 = array[i][1];
          let length2 = array[index][1];
          while (length1 > 0) {
            row1++;
            if (row1 == row2) {
              throw new Error("No overlapping ships!");
            }
            length1--;
          }

          while (length2 > 0) {
            row2++;
            if (row1 == row2) {
              throw new Error("No overlapping ships!");
            }
            length2--;
          }
        }

        index++;
      }
    }

    this.board = new Gameboard(array);
  }
}

export { createBoard, placeShips, Ship, Player };
