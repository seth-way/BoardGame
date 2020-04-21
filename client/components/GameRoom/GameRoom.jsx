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
    getRemainingPieces,
    handleMouseEnter,
    handleMouseLeave,
  } = props;
  const renderPlayerInfo = () => (player === whosTurn
    ? (
      <h3 id="yourTurn">
        Your Turn Player
        {' '}
        {player === 1 ? '1' : '2'}
      </h3>
    )
    : (
      <h3 id="waiting">
        Waiting On Player
        {' '}
        {player === 1 ? '2' : '1'}
      </h3>
    ));
  const renderRemainingPieces = () => {
    const remainingPieces = getRemainingPieces(board);
    if (remainingPieces[0] === 0) {
      return <h1>Player 2 WINS!!</h1>;
    }
    if (remainingPieces[1] === 0) {
      return <h1> Player 1 WINS!!</h1>;
    }
    return (
      <div>
        <h3>Remaining Pieces</h3>
        <span>
          {' '}
          Player 1:
          {' '}
          {remainingPieces[0]}
        </span>
        <span>
          {' '}
          Player 2:
          {' '}
          {remainingPieces[1]}
        </span>
      </div>
    );
  };

  return (
    <div className="gameRoomContainer">
      {renderPlayerInfo()}
      {renderRemainingPieces()}
      <div>
        <Board board={board} handleSelectCell={handleSelectCell} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
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
