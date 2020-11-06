const axios = require('axios');

const createParty = async (barInfo, size = 1) => {
  const {
    name,
    formatted_address,
    formatted_phone_number,
    geometry: { location },
  } = barInfo;
  const lat = location.lat();
  const lng = location.lng();
  const bar = await axios.post('/db/bar/create', {
    bar_name: name,
    phone_number: formatted_phone_number,
    address: formatted_address,
    latitude: lat,
    longitude: lng,
  });
  const barId = bar.data[0].id;
  await axios.post('db/party/create', {
    id_bar: barId,
    size,
  });
};

module.exports = createParty;
