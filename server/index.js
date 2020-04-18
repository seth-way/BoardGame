const path = require('path');
const express = require('express');

const app = express();
const PORT = 80;

app.use(express.static('public'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express Server Listening on port: ${PORT}`);
});
