/* eslint-disable react/prop-types */
import React from 'react';

const Cell = (props) => {
  const {
    cell, row, column, handleSelectCell,
  } = props;
  const player = {
    1: 'playerOne',
    [-1]: 'playerTwo',
  };
  const { value } = cell;
  const className = `gameCell ${player[value]}`;
  return (
    <span
      className={className}
      role="button"
      onClick={handleSelectCell}
      tabIndex={0}
      onKeyPress={handleSelectCell}
      row={row}
      column={column}
      value={value}
      id=""
    />
  );
};

export default Cell;
