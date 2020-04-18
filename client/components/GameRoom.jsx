/* eslint-disable react/prop-types */
import React from 'react';
// import axios from 'axios';

class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    const { roomID } = this.props;
    this.state = {
      roomID,
    };
  }

  render() {
    const { roomID } = this.state;
    return (
      <div>
        Youre In Game Room
        {' '}
        { roomID }
      </div>
    );
  }
}

export default GameRoom;
