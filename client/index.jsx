import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
// eslint-disable-next-line import/extensions
import GameRoom from './components/GameRoom.jsx';

ReactDOM.render(<GameRoom roomID={path.basename(window.document.URL)} />, document.getElementById('gameRoom'));
