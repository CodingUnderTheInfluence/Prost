const axios = require('axios');

const barCapacity = (barId) => {
  return axios.get(`/db/party/${barId}`)
    .then(({ data }) => {
      return data.reduce((total, partySize) => {
        total += partySize.size;
        return total;
      }, 0);
    })
    .catch(() => console.warn('error in axios party'));
};

module.exports = barCapacity;
