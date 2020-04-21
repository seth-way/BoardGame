
class Cell {
  constructor(value, moves) {
    this.value = value;
    this.moves = moves;
  }
}
// eslint-disable-next-line max-len
const allDirections = {
  0: true, 45: true, 90: true, 135: true, 180: true, 225: true, 270: true, 315: true,
};
const upDownLeftRight = {
  0: true, 90: true, 180: true, 270: true,
};

const fanoronaBoard = [
  [new Cell(-1, { 90: true, 135: true, 180: true }),
    new Cell(-1, { 90: true, 180: true, 270: true }),
    new Cell(-1, {
      90: true, 135: true, 180: true, 225: true, 270: true,
    }),
    new Cell(-1, { 90: true, 180: true, 270: true }),
    new Cell(-1, {
      90: true, 135: true, 180: true, 225: true, 270: true,
    }),
    new Cell(-1, { 90: true, 180: true, 270: true }),
    new Cell(-1, {
      90: true, 135: true, 180: true, 225: true, 270: true,
    }),
    new Cell(-1, { 90: true, 180: true, 270: true }),
    new Cell(-1, { 180: true, 225: true, 270: true })],
  [new Cell(-1, { 0: true, 90: true, 180: true }),
    new Cell(-1, allDirections),
    new Cell(-1, upDownLeftRight),
    new Cell(-1, allDirections),
    new Cell(-1, upDownLeftRight),
    new Cell(-1, allDirections),
    new Cell(-1, upDownLeftRight),
    new Cell(-1, allDirections),
    new Cell(-1, { 0: true, 180: true, 270: true })],
  [new Cell(-1, {
    0: true, 45: true, 90: true, 135: true, 180: true,
  }),
  new Cell(1, upDownLeftRight),
  new Cell(-1, allDirections),
  new Cell(1, upDownLeftRight),
  new Cell(0, allDirections),
  new Cell(-1, upDownLeftRight),
  new Cell(1, allDirections),
  new Cell(-1, upDownLeftRight),
  new Cell(1, {
    0: true, 180: true, 225: true, 270: true, 315: true,
  })],
  [new Cell(1, { 0: true, 90: true, 180: true }),
    new Cell(1, allDirections),
    new Cell(1, upDownLeftRight),
    new Cell(1, allDirections),
    new Cell(1, upDownLeftRight),
    new Cell(1, allDirections),
    new Cell(1, upDownLeftRight),
    new Cell(1, allDirections),
    new Cell(1, { 0: true, 180: true, 270: true })],
  [new Cell(1, { 0: true, 45: true, 90: true }),
    new Cell(1, { 0: true, 90: true, 270: true }),
    new Cell(1, {
      0: true, 45: true, 90: true, 270: true, 315: true,
    }),
    new Cell(1, { 0: true, 90: true, 270: true }),
    new Cell(1, {
      0: true, 45: true, 90: true, 270: true, 315: true,
    }),
    new Cell(1, { 0: true, 90: true, 270: true }),
    new Cell(1, {
      0: true, 45: true, 90: true, 270: true, 315: true,
    }),
    new Cell(1, { 0: true, 90: true, 270: true }),
    new Cell(1, { 0: true, 270: true, 315: true })],
];

class Fanorona {
  constructor() {
    this.board = fanoronaBoard;
  }
}

module.exports = Fanorona;
