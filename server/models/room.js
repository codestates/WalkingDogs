'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.room.hasMany(models.room_dog, {
        foreignKey: 'room_id',
        targetKey: 'id',
      });

      models.room.hasMany(models.user_room, {
        foreignKey: 'room_id',
        targetKey: 'id',
      });

      models.room.hasMany(models.comment, {
        foreignKey: 'room_id',
        targetKey: 'id',
      });

      models.room.belongsTo(models.user, {
        foreignKey: { name: 'leader_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  room.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      member_limit: DataTypes.INTEGER,
      leader_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // coordinates: {
      //   type: DataTypes.GEOMETRY('POINT'),
      //   allowNull: false,
      // },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meeting_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'room',
      tableName: 'room',
    },
  );
  return room;
};
