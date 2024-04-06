import p5 from "p5";
import _ from "lodash";
const WIDTH = 7;
const HEIGHT = 6;
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const ELEMENT_SIZE = SCREEN_WIDTH / WIDTH;
const OFFSET = ELEMENT_SIZE / 2;
type boardType = number[][];
let board: boardType = _.chunk(new Array(WIDTH * HEIGHT).fill(0), WIDTH);
board[1][2] = 1;
export function setup(p: p5) {
  p.createCanvas(400, 400);
}

export function draw(p: p5) {
  p.background(222);

  displayBoard(board, p);
}
function findFirstAvailableSlot(board: boardType, col: number) {
  const column = board.map((row) => {
    return row[col];
  });
  console.log(column);
  const indexOfFirst = column.reduceRight((prev, curr, i) => {
    if (curr !== 0) {
      return i;
    }
    return prev;
  }, HEIGHT);
  return indexOfFirst - 1;
}
console.log(findFirstAvailableSlot(board, 1));
function colorElement(n: number, p: p5) {
  switch (n) {
    case 1:
      p.fill(255, 0, 0);
      break;
    case 2:
      p.fill(0, 0, 255);
      break;
    case 11:
      p.fill(0, 255, 0);
      break;
    default:
      p.fill(255);

      break;
  }
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
