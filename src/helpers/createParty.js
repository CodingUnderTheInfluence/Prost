const axios = require('axios');

const createParty = async (barInfo, size = 1) => {
  const {
    name,
    formatted_address,
    formatted_phone_number,
  } = barInfo;
  const bar = await axios.post(`/db/bar/create`, {
    bar_name: name,
    phone_number: formatted_phone_number,
    address: formatted_address
  });
  const barId = bar.data[0].id;

  await axios.post(`db/party/create`, {
    id_bar: barId,
    size: size
  });
};

module.exports = createParty;