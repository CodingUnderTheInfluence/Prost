const axios = require('axios');

/**
 * @param {Number} barId : current bar that is clicked
 * gets the current bar and the customers in the bar,
 * returns an object with total, covid total and spots left
 * or null if bar is not registered with app
 */
const barCapacity = async (barId) => {
  try {
    const bar = await axios.get(`/db/bar/parties?id=${barId}`);
    const currentCustomers = await axios.get(`/db/bar/currentOcc/${barId}`);
    const { id_owner, bar_capacity } = bar.data[0];

    const occupency = {
      total: parseInt(bar_capacity),
      covidTotal: parseInt(bar_capacity) / 4,
      current: currentCustomers.data.length,
    };

    return id_owner ? occupency : null;
  } catch (err) {
    console.warn('error in axios party:', err);
  }
};

const barPercentCapacity = (covidTotal, currentCapacity) => currentCapacity / covidTotal;

// TODO:
/**
 * @param {Number} barId : current bar that is clicked
 * gets the bar size and reduces the count
 */
// const barCapacity = (barId) => axios.get(`/db/party/${barId}`)
//   .then(({ data }) => data.reduce((total, partySize) => {
//     total += partySize.size;
//     return total;
//   }, 0))
//   .catch(() => console.warn('error in axios party'));

module.exports = {
  barCapacity,
  barPercentCapacity,
};
