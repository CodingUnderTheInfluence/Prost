module.exports = (sequelize, DataTypes) => {
  const { Op } = sequelize;
  const Thread = sequelize.define('thread', {
  }, {
    freezeTableName: true,
  });

  Thread.associate = (models) => {
    Thread.hasMany(models.Message, {
      foreignKey: 'id_thread'
    });
  };
  return Thread;
};
