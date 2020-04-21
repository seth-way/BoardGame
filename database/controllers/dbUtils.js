/* eslint-disable no-console */
/* eslint-disable consistent-return */
const axios = require('axios');

module.exports = {

  createNewRoom(callback) {
    axios.get('/api/newRoom/')
      .then(({ data }) => {
        callback(null, data);
      })
      .catch(err => callback(err));
  },

  refreshRoom(id, callback) {
    axios.get(`/api/refreshRoom/${id}`)
      .then(({ data }) => {
        callback(null, data);
      })
      .catch(err => callback(err));
  },

  updateRoom(id, data, callback) {
    axios.post(`/api/updateRoom/${id}`, data)
      .then((response) => {
        callback(null, response);
      })
      .catch(err => callback(err));
  },
};
