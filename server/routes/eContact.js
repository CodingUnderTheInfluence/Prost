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
const { Router } = require('express');
const { Op } = require('sequelize');
const eContactRouter = Router();

eContactRouter.get('/', (req, res) => {
  EContact.findAll()
    .then((eContacts) => {
      res.send(eContacts);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})

eContactRouter.post('/create', (req, res) => {
  console.log(req.body, 'EMERGENCY CONTACT')
})



//  //EMERGENCY CONTACT INFORMATION FIELDS
//  const [emFirst, setEmFirst] = useState('');
//  const [emLast, setEmLast] = useState('');
//  const [emEmail, setEmEmail] = useState('');
//  const [emNumber, setEmNumber] = useState();
//  //EMERGENCY CONTACT INFORMATION SUBMIT
//  const eContactInformationSubmit = () => {
//      const emergencyParams = {
//          first: emFirst,
//          last: emLast,
//          email: emEmail,
//          number: emNumber,
//      }
//      axios.post('/db/eContact/create', { emergencyParams })
//          .then(() => {
//              console.log(` Successfully posted ${personalFirst}'s Emergency Contact Information to the server`)
//          })
//  }



module.exports = {
  eContactRouter,
};