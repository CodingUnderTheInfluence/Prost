module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    body: {
      type: DataTypes.STRING,
    },
    id_thread: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'thread',
        key: 'id'
      }
    },
    id_customer: {
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
