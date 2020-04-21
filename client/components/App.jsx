/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createNewRoom, refreshRoom, updateRoom } from '../../database/controllers/dbUtils';
import Lobby from './Lobby/Lobby';
import GameRoom from './GameRoom/GameRoom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // password: '',
      board: [],
      check_id: '',
      _id: '',
      player: 1,
      whosTurn: 1,
      selected: [],
      availableMoves: [],
    };
    this.checkFreeSpaces = props.checkFreeSpaces;
    this.checkAttackForward = props.checkAttackForward;
    this.checkAttackBackward = props.checkAttackBackward;
    this.attackForward = props.attackForward;
    this.attackBackward = props.attackBackward;
    this.getRemainingPieces = props.getRemainingPieces;
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.waitForTurn = this.waitForTurn.bind(this);
    this.checkFreeSpaces = this.checkFreeSpaces.bind(this);
    this.handleSelectCell = this.handleSelectCell.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    this.waitForTurn();
  }

  handleCreateRoom(event) {
    createNewRoom((err, data) => {
      if (err) {
        console.log(err);
      }
      const { _id, board } = data;
      this.setState({
        board,
        _id,
        player: 1,
      });
    });
    event.preventDefault();
  }

  handleJoinRoom(event) {
    const { check_id } = this.state;
    refreshRoom(check_id, (err, data) => {
      if (err) {
        // eslint-disable-next-line no-alert
        alert(`Error Retreiving Game ${check_id}`);
      }
      const { _id, board, whosTurn } = data;
      this.setState({
        board,
        _id,
        whosTurn,
      });
      this.waitForTurn();
    });
    event.preventDefault();
  }

  handleInputChange(event) {
    const { name } = event.target;
    let { value } = event.target;
    value = name === 'player' ? parseInt(value, 10) : value;
    this.setState({ [name]: value });
    event.preventDefault();
  }

  handleSelectCell(event) {
    // Element.setAttribute(name, value);
    const {
      player, selected, availableMoves, _id,
    } = this.state;
    let { whosTurn } = this.state;
    let { board } = this.state;
    // check if its your turn
    if (player === whosTurn) {
      const row = parseInt(event.target.getAttribute('row'), 10);
      const column = parseInt(event.target.getAttribute('column'), 10);
      const cell = [row, column];

      const value = parseInt(event.target.getAttribute('value'), 10);
      const className = event.target.getAttribute('class');
      const freeSpaces = this.checkFreeSpaces(row, column, board);
      // if no cell has been chosen
      if (selected.length === 0) {
        if (freeSpaces && value === player) {
          event.target.setAttribute('class', `${className} selected`);
          this.setState({ selected: cell, availableMoves: freeSpaces });
        }
      // deselect if same cell is chosen
      } else if (selected[0] === row && selected[1] === column) {
        event.target.setAttribute('class', className.slice(0, className.lastIndexOf(' ')));
        selected.splice(0, selected.length);
        availableMoves.splice(0, availableMoves.length);
        this.setState({ selected, availableMoves });
      // if move is available....
      } else if (availableMoves.some(ele => (ele[0] === cell[0] && ele[1] === cell[1]))) {
        // check attacks forward and backward
        let dir;
        for (let i = 0; i < availableMoves.length; i += 1) {
          if (availableMoves[i][0] === cell[0] && availableMoves[i][1] === cell[1]) {
            // eslint-disable-next-line prefer-destructuring
            dir = availableMoves[i][2];
            break;
          }
        }
        const f = this.checkAttackForward(player, selected[0], selected[1], board, dir);
        const b = this.checkAttackBackward(player, selected[0], selected[1], board, dir);
        if (b && f) {
          board = this.attackForward(player, selected[0], selected[1], board, dir);
          board = this.attackBackward(player, selected[0], selected[1], board, dir);
        } else if (f) {
          board = this.attackForward(player, selected[0], selected[1], board, dir);
        } else if (b) {
          board = this.attackBackward(player, selected[0], selected[1], board, dir);
        }
        // move piece
        board[selected[0]][selected[1]].value = 0;
        board[row][column].value = player;
        whosTurn *= -1;
        selected.splice(0, selected.length);
        availableMoves.splice(0, availableMoves.length);
        this.setState({
          board,
          selected,
          availableMoves,
          whosTurn,
        });
        updateRoom(_id, { board, whosTurn }, (err) => {
          if (err) {
            // eslint-disable-next-line no-alert
            alert(`Error Retreiving Game ${_id}`);
          }
          refreshRoom(_id, (err2, data) => {
            if (err2) {
              // eslint-disable-next-line no-alert
              alert(`Error Retreiving Game ${_id}`);
            } else {
              const newBoard = data.board;
              const newWhosTurn = data.whosTurn;
              this.setState({
                board: newBoard,
                whosTurn: newWhosTurn,
              });
            }
            this.waitForTurn();
          });
        });
      }
    }
    event.preventDefault();
  }

  handleMouseEnter(event) {
    // Element.setAttribute(name, value);
    const { board, player } = this.state;
    // check if its your turn
    const row = parseInt(event.target.getAttribute('row'), 10);
    const column = parseInt(event.target.getAttribute('column'), 10);
    const value = parseInt(event.target.getAttribute('value'), 10);
    const freeSpaces = this.checkFreeSpaces(row, column, board);
    // if no cell has been chosen
    if (freeSpaces && value === player) {
      event.target.setAttribute('id', 'hovered');
    }
  }

  handleMouseLeave(event) {
    event.target.setAttribute('id', '');
  }

  waitForTurn() {
    const { _id, player } = this.state;
    if (_id === '') {
      console.log('waiting for id to update', player);
      setTimeout(() => { this.waitForTurn(); }, 1000);
    } else {
      refreshRoom(_id, (err, data) => {
        if (err) {
          // eslint-disable-next-line no-alert
          alert(`Error Retreiving Game ${_id}`);
        }
        const { board, whosTurn } = data;
        if (player !== whosTurn) {
          console.log('waiting for your turn ', player);
          setTimeout(() => { this.waitForTurn(); }, 1000);
        } else {
          this.setState({
            whosTurn,
            board,
          });
        }
      });
    }
  }

  render() {
    const {
      _id, board, player, whosTurn,
    } = this.state;

    if (_id === '') {
      return (
        <Lobby
          handleInputChange={this.handleInputChange}
          handleCreateRoom={this.handleCreateRoom}
          handleJoinRoom={this.handleJoinRoom}
        />
      );
    }
    return (
      <GameRoom
        board={board}
        _id={_id}
        player={player}
        whosTurn={whosTurn}
        waitForTurn={this.waitForTurn}
        handleSelectCell={this.handleSelectCell}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
        getRemainingPieces={this.getRemainingPieces}
      />
    );
  }
}

export default App;
