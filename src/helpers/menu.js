const axios = require('axios');

/**
 * @param {Number} barId : Id of the current bar
 * @param {String} selected : menu information
 * @param {String} url : url to direct the axios requests
 * @returns {Function} : promise to insert new menu item
 * make the axios POST request to add the menu to the database
 * english is the current default language of the bar menu, this can be updated later
 */
const insert = (barId, info, url) => (axios.post(`${url}/db/menu/insert`, {
  barId, info, lang: 'en',
})
  .then(({ data }) => data)
  .catch((err) => console.warn(err)));

/**
 * @param {Number} barId : Id of the current bar
 * @param {String} selected : menu information
 * @param {String} url : url to direct the axios requests
 * @returns {Function} : promise to update current menu
 * make the axios POST request to add the menu to the database
 * english is the current default language of the bar menu, this can be updated later
 */
const update = (barId, info, url) => axios.put(`${url}/db/menu/update`, {
  barId, info,
})
  .then(({ data }) => data)
  .catch((err) => console.warn(err));

/**
 * @param {Number} id : Id of the current bar
 * @param {String} url : url to direct the axios requests
 * @returns {Function} : promise to get the current menu
 * make the axios GET request to get the current menu
 */
const getMenu = (id, url) => {
  if (!id || !url) {
    return;
  }
  return axios.get(`${url}/db/menu/bar/${id}`)
    .then(({ data }) => data)
    .catch((err) => console.warn(err));
};

/**
 * @param {String} string : Menu details
 * @param {String} url : url to direct the axios requests
 * @param {String} newItem : string of new menu item input
 * @param {String} type : Food or Drink category selected from form
 * @param {String} currentMenu : menu string retrieved from getMenu
 * example of newMenu Appetizers\nWings\nChips|Drinks\nVodka Cranberry Cocktail\nAmaretto Sour',
 * make sure the menu isn't 'Empty', find the section that the string needs to be inserted, split the string by |, check each the first element and match to type,
 *once the type if found, add the string to that array, join the string back together and update the menu, send axios request to the server
 *
 */
const createString = async (id, url, type, newItem, currentMenu) => {
  try {
    if (currentMenu === 'Empty' || !currentMenu) {
      const menuObj = {};
      menuObj[type] = [newItem];
      const menuString = JSON.stringify([menuObj]);
      await insert(id, menuString, url);
    } else {
      let newMenu = JSON.parse(currentMenu); // array of objects
      for (let i = 0; i < newMenu.length; i += 1) {
        const obj = newMenu[i];
        if (Object.prototype.hasOwnProperty.call(obj, type)) {
          obj[type].push((newItem));
          break;
        } else if (i + 1 === newMenu.length) {
          const menuObj = {};
          menuObj[type] = [newItem];
          newMenu.push(menuObj);
        }
      }
      newMenu = JSON.stringify(newMenu);
      await update(id, newMenu, url);
    }
  } catch (err) {
    console.warn(err);
  }
};

/**
 * @param {String} inputItem : Name of the item to add to the menu
 * @param {Number} barId : Id of the current bar
 * @param {String} selected : Drink or Food
 * check that a string is valid, get the current menu string, format the string, make the post request to the server for to add the menu,
 */

module.exports.addItem = async (selected, inputItem, barId, url) => {
  try {
    if (!inputItem || !barId || !url) {
      return;
    }
    const [results] = await getMenu(barId, url);
    createString(barId, url, selected, inputItem, results.info);
  } catch (err) {
    console.warn(err);
  }
};
module.exports.getMenu = getMenu;
/**
 * @param {String} inputItem : Name of the item to add to the menu
 * @param {Number} barId : Id of the current bar
 * @param {String} selected : Drink or Food
 * check that a string is valid, get the current menu string, format the string, make the post request to the server for to add the menu,
 */
const arrayRemove = (arr, value) => arr.filter((ele) => ele !== value);

/**
 * @param {String} inputItem : Name of the item to add to the menu
 * @param {Number} barId : Id of the current bar
 * @param {String} selected : Drink or Food
 * check that a string is valid, get the current menu string, format the string, make the post request to the server for to add the menu,
 */

module.exports.deleteItem = async (url, item, id, type) => {
  try {
    const [menuList] = await getMenu(id, url);
    const arr = JSON.parse(menuList.info);
    arr.forEach((obj) => {
      const values = obj[type];
      if (values) {
        if (values.includes(item)) {
          values.splice(values.indexOf(item), 1);
        }
      }
    });
    const newStr = JSON.stringify(arr);
    await update(id, newStr, url);
  } catch (err) {
    console.warn(err);
  }
};
