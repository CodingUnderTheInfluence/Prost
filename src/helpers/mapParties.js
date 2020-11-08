const axios = require('axios');


const mapParties = async () => {
  const getParties = await axios.get('/db/party');
  return getParties.data.map(party => {
    const { id_bar } = party;
    const getBars = await axios.get(`/db/bar/parties?id_bar=${id_bar}`);
    return getBars.data;
  });
};

module.exports = mapParties;
