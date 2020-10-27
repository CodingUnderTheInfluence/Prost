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
  }, {
    freezeTableName: true,
  });

  EContact.associate = (models) => {
    EContact.BelongsTo(models.Customers);
  };
  
  return EContact;
};
