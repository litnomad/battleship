import { createBoard, placeShips, Ship, Player } from "./logic.js";

test("createBoard returns a 10x10 board", () => {
  const board = createBoard();

  expect(board).toHaveLength(10);
  expect(board.every((row) => row.length === 10)).toBe(true);
});

test("placeShips adds ships into the board using coordinates", () => {
  const board = createBoard();
  const placements = placeShips(
    [
      [[0, 0], 3],
      [[5, 2], 2],
    ],
    board,
  );

  expect(board[0][0][0]).toBeInstanceOf(Ship);
  expect(board[5][2][0]).toBeInstanceOf(Ship);
});

describe("new player gets a gameboard", () => {
  const player = new Player([
    [[0, 8], 3],
    [[5, 0], 4],
    [[9, 5], 2],
    [[5, 2], 5],
    [[9, 7], 3],
  ]);

  test("ships placed for new player", () => {
    expect(player.board.getBoard()[0][8][0]).toBeInstanceOf(Ship);
    expect(player.board.getBoard()[5][0][0]).toBeInstanceOf(Ship);
    expect(player.board.getBoard()[9][5][0]).toBeInstanceOf(Ship);
    expect(player.board.getBoard()[5][2][0]).toBeInstanceOf(Ship);
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
    
    expect(player.board.getBoard()[0][8][0].sunk).toBe(true)
  })
});
