'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      member_limit: {
        type: Sequelize.INTEGER,
      },
      leader_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'user',
          key: 'id',
        },
      },
      // coordinates: {
      //   allowNull: false,
      //   type: Sequelize.GEOMETRY('POINT')
      // },
      latitude: {
        allowNull: false,
        type: Sequelize.FLOAT(9,6),
      },
      longitude: {
        allowNull: false,
        type: Sequelize.FLOAT(9,6),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      region_1depth_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region_2depth_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region_3depth_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      meeting_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('room');
  },
};
