import p5 from "p5";
import _ from "lodash";
const WIDTH = 7;
const HEIGHT = 6;
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const ELEMENT_SIZE = SCREEN_WIDTH / WIDTH;
const OFFSET = ELEMENT_SIZE / 2;

let currPlayer = 1;
let currGhost = 11;
type boardType = number[][];
let board: boardType = _.chunk(new Array(WIDTH * HEIGHT).fill(0), WIDTH);

export function setup(p: p5) {
  p.createCanvas(400, 400);
}

export function draw(p: p5) {
  p.background(222);

  displayBoard(board, p);
  handleCursor(p, board);
}
export function mousePressed(p: p5) {
  setPiecePlace(p, currPlayer);
  togglePlayer();
}
function togglePlayer() {
  currPlayer = currPlayer === 1 ? 2 : 1;
  currGhost = currGhost === 11 ? 22 : 11;
}
function getCollumn(p: p5) {
  const cursorPos = Math.floor(p.mouseX / ELEMENT_SIZE);
  return cursorPos;
}
function setPiecePlace(p: p5, val: number) {
  const cursorPos = getCollumn(p);
  board[findFirstAvailableSlot(board, cursorPos)][cursorPos] = val;
}
function findFirstAvailableSlot(board: boardType, col: number) {
  const column = board.map((row) => {
    return row[col];
  });
  const indexOfFirst = column.reduceRight((prev, curr, i) => {
    if (curr === 1 || curr === 2) {
      return i;
    }
    return prev;
  }, HEIGHT);
  return indexOfFirst - 1;
}
function colorElement(n: number, p: p5) {
  switch (n) {
    case 1:
      p.fill(255, 0, 0);
      break;
    case 2:
      p.fill(0, 0, 255);
      break;
    case 11:
      p.fill(255, 0, 0, 50);
      break;
    case 22:
      p.fill(0, 0, 255, 50);
      break;
    default:
      p.fill(255);

      break;
  }
}
function handleCursor(p: p5, board: boardType) {
  for (const i in board[1]) {
    board[findFirstAvailableSlot(board, Number(i))][Number(i)] = 0;
  }
  setPiecePlace(p, currGhost);
}
function displayBoard(board: boardType, p: p5) {
  for (let y = 0; y < board.length; y++) {
    const column = board[y];
    for (let x = 0; x < column.length; x++) {
      const xCord = x * ELEMENT_SIZE + OFFSET;
      const yCord = y * ELEMENT_SIZE + 2 * OFFSET;
      colorElement(column[x], p);
      p.circle(xCord, yCord, ELEMENT_SIZE);
    }
  }
}
