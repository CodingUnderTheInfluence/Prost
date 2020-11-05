const axios = require('axios');


const mapParties = async () => {
  const getParties = await axios.get('/db/party');
  return getParties.data.map(party => {
    console.info('mapparty', party);
    const { id_bar } = party;
    const getBars = await axios.get(`/db/bar/parties?id_bar=${id_bar}`);
    return getBars.data;
  });
};


// axios.get('/db/party')
//   .then(({data}) => {
//     if (isMounted) {
//       data.map(party => {
//         const { id_bar } = party;
//         axios.get(`/db/bar/parties?id_bar=${id_bar}`)
//           .then(({data}) => {
//             setParties(data);
//           })
//       });
//     }
//   });

module.exports = mapParties;