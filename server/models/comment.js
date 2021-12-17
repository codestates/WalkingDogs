'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.user, {
        foreignKey: { name: 'user_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });

      models.comment.belongsTo(models.room, {
        foreignKey: { name: 'room_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  comment.init(
    {
      message: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'comment',
      tableName: 'comment',
    },
  );
  return comment;
};
