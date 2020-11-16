module.exports = (sequelize, DataTypes) => {
  const PublicChat = sequelize.define('publicchat', {
    body: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  });

  return PublicChat;
};