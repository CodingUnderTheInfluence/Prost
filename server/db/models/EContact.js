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
        model: "customer",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  
  return EContact;
};
