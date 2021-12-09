'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_join_req extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.room_join_req.belongsTo(models.user, {
        foreignKey: { name: 'user_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });

      models.room_join_req.belongsTo(models.room, {
        foreignKey: { name: 'room_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  };
  room_join_req.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    room_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'room_join_req',
    tableName: 'room_join_req',
  });
  return room_join_req;
};