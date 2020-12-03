const axios = require('axios');
/**
 * @param {Number} barId : Id of the current bar
 * @param {String} selected : menu information
 * make the axios POST request to add the menu to the database
 * english is the current default language of the bar menu, this can be updated later
 */
const insert = (barId, info) => {
  axios.post('/db/menu/insert', {
    barId, info, lang: 'en',
  })
    .then((res) => console.log(res))
    .catch((err) => console.warn(err));
};
/**
 * @param {Number} barId : Id of the current bar
 * @returns {String} current menu
 * make the axios GET request to get the current menu
 */
const getMenu = (barId) => {
  axios.get(`/db/menu/bar/${barId}`)
    .then((result) => result)
    .catch((err) => console.warn(err));
};

/**
 * @param {String} string : Menu details
 * @returns {String} new menu
 */
const createString = (string) => {
// get the current menu string
// make sure the menu isn't 'Empty'
// find the section that the string needs to be inserted
// add the string
// recture the new menu string
};

/**
 * @param {String} inputItem : Name of the item to add to the menu
 * @param {Number} barId : Id of the current bar
 * @param {String} selected : Drink or Food
 * check that a string is valid, get the barId, format the string, make the post request to the server for to add the menu,
 */

module.exports.addItem = (selected, inputItem, barId) => {
  console.log(inputItem, selected, barId);
  if (inputItem === '') {
    return ;
  }

  return true;
};
