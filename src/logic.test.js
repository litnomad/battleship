import { experiments } from "webpack";
import { createBoard, placeShips, Player, Ship, randomMove } from "./logic.js";

test("createBoard returns a 10x10 board", () => {
  const board = createBoard();

  expect(board).toHaveLength(10);
  expect(board.every((row) => row.length === 10)).toBe(true);
});

test("placeShips adds ships into the board using coordinates", () => {
  const board = createBoard();
  const placements = placeShips(
    [
      [[0, 0], 3, "horizontal"],
      [[5, 2], 2, "vertical"],
    ],
    board,
  );

  expect(board[0][0][0]).toBeInstanceOf(Ship);
  expect(board[5][2][0]).toBeInstanceOf(Ship);
});

describe("first player gets a gameboard", () => {
  const player = new Player([
    [[0, 8], 3, "horizontal"],
    [[5, 0], 4, "vertical"],
    [[9, 0], 2, "vertical"],
    [[7, 0], 1, "horizontal"],
    [[9, 7], 3, "vertical"],
  ]);

  test("all ships are placed", () => {
    expect(player.board.getBoard()[0][8][0]).toBeInstanceOf(Ship);
    expect(player.board.getBoard()[5][0][0]).toBeInstanceOf(Ship);
    expect(player.board.getBoard()[9][0][0]).toBeInstanceOf(Ship);
    expect(player.board.getBoard()[7][0][0]).toBeInstanceOf(Ship);
    expect(player.board.getBoard()[9][7][0]).toBeInstanceOf(Ship);
  });

  test("receiveAttack takes a pair of coordinates then sends the hit function to the correct ship", () => {
    player.board.receiveAttack(0, 8);

    expect(player.board.getBoard()[0][8][0].hit).toBe(1);
  });

  test("receiveAttack takes a pair of coordinates then records the coordinates of the missed shot", () => {
    player.board.receiveAttack(0, 0);

    expect(player.board.getBoard()[0][0][0]).toBe("miss");
  });

  test("ship is sunk when number of hits equals length", () => {
    player.board.receiveAttack(0, 8);
    player.board.receiveAttack(0, 8);
    player.board.receiveAttack(0, 8);

    expect(player.board.getBoard()[0][8][0].sunk).toBe(true);
  });

  test("randomMove generates random x,y coordinates", () => {
    const x = randomMove().column;
    const y = randomMove().row;

    expect(Number.isInteger(x)).toBe(true);
    expect(Number.isInteger(y)).toBe(true);
  });

  test("randomMove generates random x,y coordinates between 0-9", () => {
    const integars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const x = randomMove().column;
    const y = randomMove().row;

    const a = integars.find((e) => e === x);
    const b = integars.find((e) => e === y);

    expect(x).toBe(a);
    expect(y).toBe(b);
  });
});

describe("second player gets a gameboard", () => {
  const computer = new Player([
    [[0, 0], 6, "horizontal"],
    [[0, 5], 4, "vertical"],
    [[4, 7], 2, "vertical"],
    [[1, 9], 3, "horizontal"],
    [[6, 9], 3, "horizontal"],
  ]);

  test("all ships are placed", () => {
    expect(computer.board.getBoard()[0][0][0]).toBeInstanceOf(Ship);
    expect(computer.board.getBoard()[0][5][0]).toBeInstanceOf(Ship);
    expect(computer.board.getBoard()[4][7][0]).toBeInstanceOf(Ship);
    expect(computer.board.getBoard()[1][9][0]).toBeInstanceOf(Ship);
    expect(computer.board.getBoard()[6][9][0]).toBeInstanceOf(Ship);
  });
});

describe("throws an error when ships overlap", () => {
  test("throws an error for vertical ships with lengths 6 at 0,8 and 0,0", () => {
    expect(
      () =>
        new Player([
          [[0, 8], 6, "vertical"],
          [[0, 0], 6, "vertical"],
          [[4, 7], 2, "vertical"],
          [[1, 9], 3, "horizontal"],
          [[6, 9], 3, "horizontal"],
        ]),
    ).toThrow(Error);
  });

  test("throws an error for vertical ships with lengths 5 and 2 at 0,0 and 0,1", () => {
    expect(
      () =>
        new Player([
          [[0, 0], 5, "vertical"],
          [[0, 1], 2, "vertical"],
          [[4, 7], 2, "vertical"],
          [[1, 9], 3, "horizontal"],
          [[6, 9], 3, "horizontal"],
        ]),
    ).toThrow("Overlapping ships at 0, 1");
  });

});

describe("win condition when all ships are sunk", () => {
  test("allSunk() method returns true when all ships are sunk", () => {
    const player = new Player([
      [[0, 0], 3, "horizontal"],
      [[0, 5], 2, "vertical"],
      [[4, 7], 1, "vertical"],
      [[1, 9], 1, "horizontal"],
      [[6, 9], 1, "horizontal"],
    ]);

    player.board.receiveAttack(0, 0);
    player.board.receiveAttack(1, 0);
    player.board.receiveAttack(2, 0);
    player.board.receiveAttack(0, 5);
    player.board.receiveAttack(0, 6);
    player.board.receiveAttack(4, 7);
    player.board.receiveAttack(1, 9);
    player.board.receiveAttack(6, 9);

    expect(player.board.allSunk()).toBe(true);
  });

  test("allSunk() method returns false when not all ships are sunk", () => {
    const player = new Player([
      [[0, 0], 3, "horizontal"],
      [[0, 5], 2, "vertical"],
      [[4, 7], 1, "vertical"],
      [[1, 9], 1, "horizontal"],
      [[6, 9], 1, "horizontal"],
    ]);

    player.board.receiveAttack(0, 0);
    player.board.receiveAttack(1, 0);
    player.board.receiveAttack(2, 0);
    player.board.receiveAttack(0, 5);
    player.board.receiveAttack(0, 6);
    player.board.receiveAttack(4, 7);

    expect(player.board.allSunk()).toBe(false);
  });
});
