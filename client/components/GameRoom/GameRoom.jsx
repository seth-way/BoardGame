/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import Board from './Board';

const GameRoom = (props) => {
  const {
    board,
    _id,
    player,
    whosTurn,
    handleSelectCell,
  } = props;
  const renderPlayerInfo = () => (player === whosTurn
    ? (
      <h3>
        Your Turn Player
        {' '}
        {player === 1 ? '1' : '2'}
      </h3>
    )
    : (
      <h3>
        Waiting On Player
        {' '}
        {player === 1 ? '2' : '1'}
      </h3>
    ));

  return (
    <div className="gameRoomContainer">
      {renderPlayerInfo()}
      <div>
        <Board board={board} handleSelectCell={handleSelectCell} />
      </div>
      <div>
        Room ID:
        {'  '}
        {_id}
      </div>
    </div>
  );
};

export default GameRoom;
