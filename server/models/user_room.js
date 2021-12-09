'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user_room.belongsTo(models.user, {
        foreignKey: { name: 'user_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });

      models.user_room.belongsTo(models.room, {
        foreignKey: { name: 'room_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  user_room.init(
    {
      user_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_room',
      tableName: 'user_room',
    },
  );
  return user_room;
};
