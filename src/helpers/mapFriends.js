const axios = require('axios');

const mapFriends = async () => {
  try {
    const users = axios.get('/db/maps');

  } catch {
    console.warn('error in map get:');
  }
};

mapFriends();

module.exports = mapFriends;
