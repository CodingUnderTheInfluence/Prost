module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    image: {
      type: DataTypes.STRING,
    },
    id_customer: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'customer',
        key: 'id'
      }
    },
    id_message: {
      type: DataTypes.INTEGER,
      references: {
        model: "message",
        key: "id"
      }
    },
    id_bar: {
      type: DataTypes.INTEGER,
      references: {
        model: "bar",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
 
  return Image;
};
