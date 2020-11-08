const axios = require('axios');

const barCapacity = (barId) => {
  axios.get(`/db/party/${barId}`)
    .then(({ data }) => {
      console.log(data)
      return data.reduce((total, partySize) => {
        total += partySize.size;
        return total;
      }, 0);
    })
    .catch((err) => console.warn('error in axios party'));
};

module.exports = barCapacity;