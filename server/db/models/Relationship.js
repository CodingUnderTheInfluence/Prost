module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('relationship', {
    id_follower: {
      type: DataTypes.INTERGER,
      references: {
        model: "Customer",
        key: "id"
      }
    },
    id_following: {
      type: DataTypes.INTERGER,
      references: {
        model: "Customer",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  return Relationship;
};
