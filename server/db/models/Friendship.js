module.exports = (sequelize, DataTypes) => {
  const Friendship = sequelize.define('friendship', {
    id_customer: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
    id_friend: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
    status: {
      type: DataTypes.INTEGER,
    }
  }, {
    freezeTableName: true,
  });
  return Friendship;
};
