'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.user_room, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });

      models.user.hasMany(models.room_join_req, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });

      models.user.hasMany(models.dog, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });

      models.user.hasMany(models.room, {
        foreignKey: 'leader_id',
        targetKey: 'id',
      });

      models.user.hasMany(models.comment, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
    }
  }
  user.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      kakao_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_member: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'user',
    },
  );
  return user;
};
