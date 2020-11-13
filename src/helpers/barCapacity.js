const axios = require('axios');

const barCapacity = (barId) => axios.get(`/db/bar/parties?id=${barId}`)
  .then(({ data }) => data.reduce((total, bar) => {
    if (bar.bar_capacity === null) {
      return null;
    }
    total += parseInt(bar.bar_capacity);
    return total;
  }, 0))
  .catch(() => console.warn('error in axios party'));

// const barCapacity = (barId) => axios.get(`/db/party/${barId}`)
//   .then(({ data }) => data.reduce((total, partySize) => {
//     total += partySize.size;
//     return total;
//   }, 0))
//   .catch(() => console.warn('error in axios party'));

module.exports = barCapacity;
