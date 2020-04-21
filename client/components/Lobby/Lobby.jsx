/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
// import axios from 'axios';
// import createNewRoom from '../../../database/controllers/dbUtils';


const Lobby = (props) => {
  const { handleCreateRoom, handleJoinRoom, handleInputChange } = props;
  return (
    <div>
      <div className="form-group">
        <form onSubmit={handleCreateRoom}>
          <div>
            <input className="formButton" type="submit" value="Create New Room" />
          </div>
        </form>
      </div>
      <div className="form-group">
        <div>
          <h2>Join An Existing Room</h2>
        </div>
        <form onSubmit={handleJoinRoom}>
          <span>
            <label htmlFor="roomID">
              Room ID
              <input id="roomID" type="text" name="check_id" onChange={handleInputChange} />
            </label>
          </span>
          <span>
            <select id="playerSelector" name="player" onChange={handleInputChange}>
              <option value="1">Player 1</option>
              <option value="-1">Player 2</option>
            </select>
          </span>
          <span>
            <input className="formButton" type="submit" value="Join Room" />
          </span>
        </form>
      </div>
    </div>
  );
};

export default Lobby;
