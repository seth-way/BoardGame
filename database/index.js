/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/boardgames');

const db = mongoose.connection;

db.on('error', () => {
  console.log('Mongoose Connection Error');
});

db.once('open', () => {
  console.log('Mongoose DB Connected Successfully');
});

module.exports = db;
