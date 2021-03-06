'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.dog.hasMany(models.room_dog, {
        foreignKey: 'dog_id',
        targetKey: 'id',
      });

      models.dog.hasMany(models.room_join_req_dog, {
        foreignKey: 'dog_id',
        targetKey: 'id',
      });

      models.dog.belongsTo(models.user, {
        foreignKey: { name: 'user_id', allowNull: false },
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  dog.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      size: DataTypes.STRING,
      breed: DataTypes.STRING,
      image: DataTypes.STRING,
      neutering: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'dog',
      tableName: 'dog',
    },
  );
  return dog;
};
