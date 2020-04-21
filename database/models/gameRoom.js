const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  board: [[]],
  whosTurn: Number,
});

const GameRoom = mongoose.model('Room', roomSchema);

module.exports = GameRoom;
