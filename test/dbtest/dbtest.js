require('dotenv').config();
const {
  Customer,
  Owner,
  EContact,
  Bar,
  Message,
  Image,
  Menu,
  Party,
  Friendship,
  Thread,
  Parties_Customers,
  Customers_Bars,
  Maps,
} = require('../../server/db/models/dbindex.js');

function primeDB() {
  Party.findOrCreate({
    where: {
      size: 2,
      id_bar: 1,
    },
  })
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Party of 2 Created');
      }
      return console.error('❌ Party of 2 undefined');
    })
    .then(() => Party.findOrCreate({
      where: {
        size: 3,
        id_bar: 2,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Party of 3 Created');
      }
      return console.error('❌ Party of 3 undefined');
    })
    .then(() => Bar.findOrCreate({
      where: {
        bar_name: 'Par 3 Restaurant & Lounge',
        phone_number: '123-456-7890',
        address: '1530 E Judge Perez Dr, Chalmette, LA 70043',
        latitude: 29.937570,
        longitude: -89.950240,
        id_owner: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Par 3 Bar Created');
      }
      return console.warn('❌ Par 3 Bar undefined');
    })
    .then(() => Bar.findOrCreate({
      where: {
        bar_name: 'Bar Tonique',
        phone_number: '123-456-7890',
        address: '820 N Rampart St, New Orleans, LA 70116',
        latitude: 29.961620,
        longitude: -90.067180,
        id_owner: 2,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Bar Tonique Created');
      }
      return console.warn('❌ Bar Tonique undefined');
    })
    .then(() => Owner.findOrCreate({
      where: {
        first_name: 'Julia',
        last_name: 'Roberts',
        user_name: 'jroberts',
        password: 'password',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ jroberts owner Created');
      }
      return console.warn('❌ jroberts owner undefined');
    })
    .then(() => Owner.findOrCreate({
      where: {
        first_name: 'Nicki',
        last_name: 'Minaj',
        user_name: 'barbie',
        password: 'password',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ barbie owner Created');
      }
      return console.warn('❌ barbie owner undefined');
    })
    .then(() => Owner.findOrCreate({
      where: {
        first_name: 'Larry',
        last_name: 'Schwall',
        user_name: 'big dong',
        password: '123456',
        email: 'larryschwall@gmail.com',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ barbie owner Created');
      }
      return console.warn('❌ barbie owner undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Nami',
        last_name: 'Unknown',
        user_name: 'Navigator',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Navigator user Created');
      }
      return console.warn('❌ Navigator user undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Monkey D.',
        last_name: 'Luffy',
        user_name: 'PirateKing',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ PirateKing user Created');
      }
      return console.warn('❌ PirateKing user undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Roronoa',
        last_name: 'Zoro',
        user_name: 'SwordMaster',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ SwordMaster user Created');
      }
      return console.warn('❌ SwordMaster user undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Nico',
        last_name: 'Robin',
        user_name: 'DevilChild',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ DevilChild user Created');
      }
      return console.warn('❌ DevilChild user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 2,
        host: 1,
        id_party: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ party Created');
      }
      return console.warn('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 3,
        host: 1,
        id_party: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ party Created');
      }
      return console.warn('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 1,
        host: 2,
        id_party: 2,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ party Created');
      }
      return console.warn('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 3,
        host: 2,
        id_party: 2,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ party Created');
      }
      return console.warn('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 4,
        host: 2,
        id_party: 2,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ party Created');
      }
      return console.warn('❌ party user undefined');
    })
    .then(() => Image.findOrCreate({
      where: {
        image: 'https://source.unsplash.com/random',
        id_customer: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ map customer1 Created');
      }
      return console.error('❌ map customer1 undefined');
    })
    .then(() => Maps.findOrCreate({
      where: {
        user_name: 'big dong',
        id_google: '114252099336753341135',
        latitude: 29.924110,
        longitude: -90.107380,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ map customer2 Created');
      }
      return console.error('❌ map customer2 undefined');
    })
    .then(() => Maps.findOrCreate({
      where: {
        user_name: 'hotdog',
        id_google: '1352532099336753341135',
        latitude: 29.923389,
        longitude: -90.087357,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ image customer Created');
      }
      return console.warn('❌ image customer user undefined');
    })
    .then(() => Image.findOrCreate({
      where: {
        image: 'https://source.unsplash.com/random',
        id_bar: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ image bar Created');
      }
      return console.warn('❌ image bar user undefined');
    })
    .then(() => Friendship.findOrCreate({
      where: {
        id_friend: 2,
        id_customer: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ friendship Created');
      }
      return console.warn('❌ friendship user undefined');
    })
    .then(() => Friendship.findOrCreate({
      where: {
        id_friend: 3,
        id_customer: 4,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ friendship Created');
      }
      return console.warn('❌ friendship user undefined');
    })
    .then(() => Thread.findOrCreate({
      where: {
        id: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Thread Created');
      }
      return console.warn('❌ Thread user undefined');
    })
    .then(() => Thread.findOrCreate({
      where: {
        id: 2,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Thread Created');
      }
      return console.warn('❌ Thread user undefined');
    })
    .then(() => Message.findOrCreate({
      where: {
        body: 'Are you coming?',
        id_thread: 1,
        id_customer: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Message Created');
      }
      return console.warn('❌ Message user undefined');
    })
    .then(() => Message.findOrCreate({
      where: {
        body: 'See you at 10',
        id_thread: 1,
        id_customer: 2,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Message Created');
      }
      return console.warn('❌ Message user undefined');
    })
    .then(() => Message.findOrCreate({
      where: {
        body: 'I can\'t make it',
        id_thread: 2,
        id_customer: 4,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Message Created');
      }
      return console.warn('❌ Message user undefined');
    })
    .then(() => Message.findOrCreate({
      where: {
        body: 'Too bad',
        id_thread: 2,
        id_customer: 3,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Message Created');
      }
      return console.warn('❌ Message user undefined');
    })
    .then(() => Menu.findOrCreate({
      where: {
        image: 'https://cdn.localdatacdn.com/la/chalmette/4270737/original/E00mtC9Jui.jpg',
        id_bar: 1,
        info: 'Appetizers\nWings\nChips&Drinks\nVodka Cranberry Cocktail\nAmaretto Sour',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Menu Created');
      }
      return console.warn('❌ Menu user undefined');
    })
    .then(() => EContact.findOrCreate({
      where: {
        id_customer: 3,
        first_name: 'Vinsmoke',
        last_name: 'Sanji',
        phone_number: '123-456-7890',
        email: 'sanji@test.test',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ EContact Created');
      }
      return console.warn('❌ EContact user undefined');
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 1,
        id_bar: 1,
        favorite: false,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Customers_Bars Created');
      }
      return console.warn('❌ Customers_Bars user undefined');
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 2,
        id_bar: 2,
        favorite: false,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Customers_Bars Created');
      }
      return console.warn('❌ Customers_Bars user undefined');
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 4,
        id_bar: 2,
        favorite: false,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Customers_Bars Created');
      }
      return console.warn('❌ Customers_Bars user undefined');
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 3,
        id_bar: 1,
        favorite: false,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ Customers_Bars Created');
      }
      return console.warn('❌ Customers_Bars user undefined');
    })
    .then(() => Image.findOrCreate({
      where: {
        image: 'https://source.unsplash.com/random',
        id_message: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.info('✅ image message Created');
      }
      return console.warn('❌ image message user undefined');
    })
    .catch((err) => {
      console.warn(`❌${err}`);
    });
}

primeDB();
