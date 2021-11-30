'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.room_dog.belongsTo(models.room, {
        foreignKey: { name: "room_id", allowNull: false },
        targetKey: "id",
        onDelete: "CASCADE",
      })

      models.room_dog.belongsTo(models.dog, {
        foreignKey: { name: "dog_id", allowNull: false },
        targetKey: "id",
        onDelete: "CASCADE",
      })
    }
  };
  room_dog.init({
    dog_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room_dog',
  });
  return room_dog;
};