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
  Relationship,
  Thread,
  Parties_Customers,
  Customers_Bars,
} = require('../../server/db/models/dbindex.js');

function primeDB() {
  Party.findOrCreate({
    where: {
      size: 2,
      id_bar: 1
    }
  })
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Party of 2 Created');
      }
      return console.error('❌ Party of 2 undefined');
    })
    .then(() => Party.findOrCreate({
      where: {
        size: 3,
        id_bar: 2
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Party of 3 Created');
      }
      return console.error('❌ Party of 3 undefined');
    })
    .then(() => Bar.findOrCreate({
      where: {
        bar_name: 'Par 3 Restaurant & Lounge',
        phone_number: '123-456-7890',
        address: '1530 E Judge Perez Dr, Chalmette, LA 70043',
        id_owner: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Par 3 Bar Created');
      }
      return console.error('❌ Par 3 Bar undefined');
    })
    .then(() => Bar.findOrCreate({
      where: {
        bar_name: 'Bar Tonique',
        phone_number: '123-456-7890',
        address: '820 N Rampart St, New Orleans, LA 70116',
        id_owner: 2,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Bar Tonique Created');
      }
      return console.error('❌ Bar Tonique undefined');
    })
    .then(() => Owner.findOrCreate({
      where: {
        first_name: 'Julia',
        last_name: 'Roberts',
        user_name: 'jroberts',
        password: 'password',
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ jroberts owner Created');
      }
      return console.error('❌ jroberts owner undefined');
    })
    .then(() => Owner.findOrCreate({
      where: {
        first_name: 'Nicki',
        last_name: 'Minaj',
        user_name: 'barbie',
        password: 'password',
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ barbie owner Created');
      }
      return console.error('❌ barbie owner undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Nami',
        last_name: 'Unknown',
        user_name: 'Navigator',
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Navigator user Created');
      }
      return console.error('❌ Navigator user undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Monkey D.',
        last_name: 'Luffy',
        user_name: 'PirateKing',
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ PirateKing user Created');
      }
      return console.error('❌ PirateKing user undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Roronoa',
        last_name: 'Zoro',
        user_name: 'SwordMaster',
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ SwordMaster user Created');
      }
      return console.error('❌ SwordMaster user undefined');
    })
    .then(() => Customer.findOrCreate({
      where: {
        first_name: 'Nico',
        last_name: 'Robin',
        user_name: 'DevilChild',
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ DevilChild user Created');
      }
      return console.error('❌ DevilChild user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 2,
        host: 1,
        id_party: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ party Created');
      }
      return console.error('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 3,
        host: 1,
        id_party: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ party Created');
      }
      return console.error('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 1,
        host: 2,
        id_party: 2,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ party Created');
      }
      return console.error('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 3,
        host: 2,
        id_party: 2,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ party Created');
      }
      return console.error('❌ party user undefined');
    })
    .then(() => Parties_Customers.findOrCreate({
      where: {
        id_customer: 4,
        host: 2,
        id_party: 2,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ party Created');
      }
      return console.error('❌ party user undefined');
    })
    .then(() => Image.findOrCreate({
      where: {
        image: 'https://source.unsplash.com/random',
        id_customer: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ image customer Created');
      }
      return console.error('❌ image customer user undefined');
    })
    .then(() => Image.findOrCreate({
      where: {
        image: 'https://source.unsplash.com/random',
        id_bar: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ image bar Created');
      }
      return console.error('❌ image bar user undefined');
    })
    .then(() => Relationship.findOrCreate({
      where: {
        id_follower: 2,
        id_following: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ relationship Created');
      }
      return console.error('❌ relationship user undefined');
    })
    .then(() => Relationship.findOrCreate({
      where: {
        id_follower: 3,
        id_following: 4,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ relationship Created');
      }
      return console.error('❌ relationship user undefined');
    })
<<<<<<< HEAD
    .then(() => Thread.findOrCreate({
      where: {
        id: 1
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Thread Created');
      }
      return console.error('❌ Thread user undefined');
    })
    .then(() => Thread.findOrCreate({
      where: {
        id: 2
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Thread Created');
      }
      return console.error('❌ Thread user undefined');
    })
=======
>>>>>>> 001f8ef... (add) all files to my forkl
    .then(() => Message.findOrCreate({
      where: {
        body: 'Are you coming?',
        id_thread: 1,
        id_customer: 1
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Message Created');
      }
      return console.error('❌ Message user undefined');
    })
    .then(() => Message.findOrCreate({
      where: {
        body: 'See you at 10',
        id_thread: 1,
        id_customer: 2
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Message Created');
      }
      return console.error('❌ Message user undefined');
    })
    .then(() => Message.findOrCreate({
      where: {
        body: 'I can\'t make it',
        id_thread: 2,
        id_customer: 4
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Message Created');
      }
      return console.error('❌ Message user undefined');
    })
    .then(() => Message.findOrCreate({
      where: {
        body: 'Too bad',
        id_thread: 2,
        id_customer: 3
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Message Created');
      }
      return console.error('❌ Message user undefined');
    })
    .then(() => Menu.findOrCreate({
      where: {
        image: 'https://cdn.localdatacdn.com/la/chalmette/4270737/original/E00mtC9Jui.jpg',
        id_bar: 1
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Menu Created');
      }
      return console.error('❌ Menu user undefined');
    })
<<<<<<< HEAD
    .then(() => EContact.findOrCreate({
=======
    .then(() => eContact.findOrCreate({
>>>>>>> 001f8ef... (add) all files to my forkl
      where: {
        id_customer: 3,
        first_name: 'Vinsmoke',
        last_name: 'Sanji',
        phone_number: '123-456-7890',
        email: 'sanji@test.test',
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
<<<<<<< HEAD
        return console.log('✅ EContact Created');
      }
      return console.error('❌ EContact user undefined');
=======
        return console.log('✅ eContact Created');
      }
      return console.error('❌ eContact user undefined');
>>>>>>> 001f8ef... (add) all files to my forkl
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 1,
        id_bar: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Customers_Bars Created');
      }
      return console.error('❌ Customers_Bars user undefined');
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 2,
        id_bar: 2,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Customers_Bars Created');
      }
      return console.error('❌ Customers_Bars user undefined');
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 4,
        id_bar: 2,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Customers_Bars Created');
      }
      return console.error('❌ Customers_Bars user undefined');
    })
    .then(() => Customers_Bars.findOrCreate({
      where: {
        id_customer: 3,
        id_bar: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Customers_Bars Created');
      }
      return console.error('❌ Customers_Bars user undefined');
    })
    .then(() => Image.findOrCreate({
      where: {
        image: 'https://source.unsplash.com/random',
        id_message: 1,
      }
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ image message Created');
      }
      return console.error('❌ image message user undefined');
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });
}

primeDB();