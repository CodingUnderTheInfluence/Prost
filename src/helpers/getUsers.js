const axios = require('axios');


module.exports = getUser = (user) => {
  axios.get(`/db/customer/${user}`)
    .then((data) => {
      console.log(data);
    })
    .catch(err => console.log(err))
};
