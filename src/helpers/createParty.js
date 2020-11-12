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

// TODO:
// const createParty = async (barInfo, customerId, size = 1) => {
//   const {
//     name,
//     formatted_address,
//     formatted_phone_number,
//     geometry: { location },
//   } = barInfo;

//   const [address, city, stateZip] = formatted_address.split(', ');
//   const [state, zip] = stateZip.split(' ');
//   const lat = location.lat();
//   const lng = location.lng();

//   try {
//     const custParty = await axios.post('/db/cb/checkin/create', {
//       barName: name,
//       address: address,
//       city: city,
//       state: state,
//       zip: zip,
//       number: formatted_phone_number,
//       customerId,
//       lat: lat,
//       lng: lng,
//     });
//     const barId = custParty.data[0].id_bar;
//     console.log('bar id??', barId);
//     // const party = await axios.post('db/party/create', {
//     //   id_bar: barId,
//     //   size,
//     // });
//     console.info('at Bar!', custParty);
//     // console.info('party created!', party)
//   } catch (err) {
//     console.warn('error in party create', err);
//   }

// };


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
