import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path';

ReactDOM.render(<GameRoom id={path.basename(window.document.URL)} />, document.getElementById('gameRoom'));