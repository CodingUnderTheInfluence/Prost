const axios = require('axios');

/**
 * 
 * @param {Object} barInfo : info about the bar
 * @param {String} customerId : google id of the current logged in customer
 * @param {Number} size : of party
 * takes in an object that is retreved from places api and a party size
 * if no party size then size is 1
 * adds info into the database
 */

const createParty = async (barInfo, size = 1) => {
  const {
    name,
    formatted_address,
    formatted_phone_number,
    geometry: { location },
  } = barInfo;
  const lat = location.lat();
  const lng = location.lng();

  const bar = await axios.post('/db/bar/create/party', {
    bar_name: name,
    phone_number: formatted_phone_number,
    address: formatted_address,
    latitude: lat,
    longitude: lng,
  });
  const barId = bar.data[0].id;
  try {
    await axios.post('db/party/create', {
      id_bar: barId,
      size,
    });
    console.info('success in creating party')
  } catch (err) {
    console.warn('error in create party');
  }
};

module.exports = createParty;
