/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import Row from './Row';

const GameRoom = (props) => {
  const { board, handleSelectCell } = props;
  if (board === []) {
    return '';
  }
  let key = 0;
  return (
    <div className="gameBoard">
      {board.map((row, index) => (<Row row={row} index={index} key={key++} handleSelectCell={handleSelectCell} />))}
    </div>
  );
};

export default GameRoom;
