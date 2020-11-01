const axios = require('axios');

const createParty = async (barInfo, size = 1) => {
  // console.log('from create a party', barInfo.geometry.location.lat())
  const {
    name,
    formatted_address,
    formatted_phone_number,
    geometry: { location }
  } = barInfo;
  const lat = location.lat();
  const lng = location.lng();
  console.log('lat, lng', lat, lng)
  const bar = await axios.post(`/db/bar/create`, {
    bar_name: name,
    phone_number: formatted_phone_number,
    address: formatted_address,
    latitude: lat,
    longitude: lng
  });
  const barId = bar.data[0].id;
  await axios.post(`db/party/create`, {
    id_bar: barId,
    size: size
  });
};

module.exports = createParty;