module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    body: {
      type: DataTypes.STRING,
    },
    id_thread: {
      type: DataTypes.INTERGER,
      reference: {
        models: 'Thread',
        key: 'id'
      }
    },
  }, {
    freezeTableName: true,
  });

  return Message;
};
