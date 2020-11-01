const axios = require('axios');

const createParty = async (search, size = 1) => {
  const bar = await axios.post(`/db/bar/create?bar_name=${search}`);
  const barId = bar.data[0].id;

  await axios.post(`db/party/create`, {
    id_bar: barId,
    size: size
  });
};

module.exports = createParty;