const axios = require('axios');

const storeBar = (bar_name, phone_number) => {
  axios.post('/db/bar', {
    bar_name,
    phone_number,
  })
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
};

module.exports = storeBar;