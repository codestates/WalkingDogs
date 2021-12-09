'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logout.init(
    {
      token: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'logout',
      tableName: 'logout',
    },
  );
  return logout;
};
