module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    body: {
      type: DataTypes.STRING,
    },
    id_recipient: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'customer',
        key: 'id'
      }
    },
    id_sender: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'customer',
        key: 'id'
      }
    },
  }, {
    freezeTableName: true,
  });

  return Message;
};
