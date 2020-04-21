/* eslint-disable import/extensions */
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {
  checkFreeSpaces,
  checkAttackForward,
  checkAttackBackward,
  attackForward,
  attackBackward,
  getRemainingPieces,
} from '../gameLogic/helperFunctions';

ReactDOM.render(
  <App
    checkFreeSpaces={checkFreeSpaces}
    checkAttackForward={checkAttackForward}
    checkAttackBackward={checkAttackBackward}
    attackForward={attackForward}
    attackBackward={attackBackward}
    getRemainingPieces={getRemainingPieces}
  />, document.getElementById('App'),
);
