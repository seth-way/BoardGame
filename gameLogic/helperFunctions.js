/* eslint-disable no-param-reassign */
// const directions = [0, 45, 90, 135, 180, 225, 270, 315];
const cardinalDirections = {
  0: [-1, 0],
  45: [-1, 1],
  90: [0, 1],
  135: [1, 1],
  180: [1, 0],
  225: [1, -1],
  270: [0, -1],
  315: [-1, -1],
};

module.exports = {
  checkFreeSpaces(row, column, board) {
    if (board.length < 1) {
      return null;
    }
    const freeSpaces = [];
    Object.keys(board[row][column].moves).forEach((direction) => {
      const change = cardinalDirections[parseInt(direction, 10)];
      if (board[row + change[0]][column + change[1]].value === 0) {
        freeSpaces.push([row + change[0], column + change[1], parseInt(direction, 10)]);
      }
    });
    return freeSpaces.length ? freeSpaces : null;
  },

  checkAttackForward(player, row, column, board, direction) {
    const change = cardinalDirections[direction];
    if (board[row + (change[0] * 2)][column + (change[1] * 2)].value === player * -1) {
      return true;
    }
    return false;
  },

  checkAttackBackward(player, row, column, board, direction) {
    const change = cardinalDirections[direction];
    if (board[row + -change[0]][column + -change[1]].value === player * -1) {
      return true;
    }
    return false;
  },

  attackForward(player, row, column, board, direction) {
    const change = cardinalDirections[direction];
    row += change[0];
    column += change[1];
    console.log('row', row, 'column', column, 'change', change);
    // eslint-disable-next-line no-shadow
    const attack = (board, row, column) => {
      if (Object.keys(board[row][column].moves).includes(direction.toString())) {
        if (board[row + change[0]][column + change[1]].value === player * -1) {
          board[row + change[0]][column + change[1]].value = 0;
          row += change[0];
          column += change[1];
          attack(board, row, column);
        }
      }
    };
    attack(board, row, column);
    return board;
  },
  attackBackward(player, row, column, board, direction) {
    const change = cardinalDirections[direction];
    change[0] *= -1;
    change[1] *= -1;
    // eslint-disable-next-line no-shadow
    const attack = (board, row, column) => {
      if (board[row + change[0]][column + change[1]].value === player * -1) {
        board[row + change[0]][column + change[1]].value = 0;
        row += change[0];
        column += change[1];
        attack(board, row, column);
      }
    };
    attack(board, row, column);
    return board;
  },
};
