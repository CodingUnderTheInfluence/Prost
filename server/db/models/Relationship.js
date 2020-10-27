module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('relationship', {
    id_follower: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
    id_following: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  return Relationship;
};
