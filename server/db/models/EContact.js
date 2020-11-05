module.exports = (sequelize, DataTypes) => {
  const EContact = sequelize.define('eContact', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    qrcode: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    id_customer: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'customer',
        key: 'id',
      },
    },
  }, {
    freezeTableName: true,
  });

  return EContact;
};

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
//              console.info(` Successfully posted ${personalFirst}'s Emergency Contact Information to the server`)
//          })
//  }
