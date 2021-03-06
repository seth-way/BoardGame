/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import Cell from './Cell';

const Row = (props) => {
  const {
    row,
    handleSelectCell,
    index,
    handleMouseEnter,
    handleMouseLeave,
  } = props;
  let key = 0;
  return (
    <div className="gameRow">
      {row.map((cell, colIndex) => (<Cell cell={cell} row={index} column={colIndex} key={key++} handleSelectCell={handleSelectCell} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />))}
    </div>
  );
};

export default Row;
