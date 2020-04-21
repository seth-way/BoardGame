/* eslint-disable no-console */
const express = require('express');

const path = require('path');
const favicon = require('serve-favicon');
const GameRoom = require('../database/models/gameRoom.js');
const Fanorona = require('../gameLogic/fanorona');

const app = express();
const PORT = 80;

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, '..', 'public', 'resources', 'favicon.ico')));
app.use(express.json());

require('../database/index.js');

app.get('/api/newRoom', (req, res) => {
  const { board } = new Fanorona();
  const room = new GameRoom({ board, whosTurn: 1 });
  room.save((error) => {
    if (error) {
      console.log('DB save error', error);
      res.status(417).send();
    }
    res.send(room);
  });
});

app.get('/api/refreshRoom/:id', (req, res) => {
  const { id } = req.params;
  GameRoom.findOne({ _id: id }, (err, room) => {
    if (err) {
      res.status(404).send(err);
    }
    res.send(room);
  });
});

app.post('/api/updateRoom/:id', (req, res) => {
  const { id } = req.params;
  const { board, whosTurn } = req.body;
  GameRoom.updateOne(
    { _id: id },
    { board, whosTurn },
    (err) => {
      if (err) {
        res.status(417).send();
      }
      res.status(200).send();
    },
  );
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express Server Listening on port: ${PORT}`);
});
