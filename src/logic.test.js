import { experiments } from "webpack";
import {
  createBoard,
  placeShips,
  Ship,
  Player,
  computerAttacks,
} from "./logic.js";

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

describe("new player gets a gameboard", () => {
  const player = new Player([
    [[0, 8], 3, "horizontal"],
    [[5, 0], 4, "vertical"],
    [[9, 0], 2, "vertical"],
    [[7, 0], 1, "horizontal"],
    [[9, 7], 3, "vertical"],
  ]);

  test("ships placed for new player", () => {
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

  test("computerAttacks generates random x,y coordinates", () => {
    const x = computerAttacks().column;
    const y = computerAttacks().row;

    expect(Number.isInteger(x)).toBe(true);
    expect(Number.isInteger(y)).toBe(true);
  });

  test("computerAttacks generates random x,y coordinates between 0-9", () => {
    const integars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const x = computerAttacks().column;
    const y = computerAttacks().row;

    const a = integars.find((e) => e === x);
    const b = integars.find((e) => e === y);

    expect(x).toBe(a);
    expect(y).toBe(b);
  });
});
