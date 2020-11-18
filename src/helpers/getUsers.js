const axios = require('axios');

module.exports = getUser = (user) => {
  axios.get(`/db/customer/${user}`)
    .then((data) => {
      console.info(data);
    })
    .catch((err) => console.warn(err));
};