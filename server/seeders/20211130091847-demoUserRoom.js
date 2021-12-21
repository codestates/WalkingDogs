'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const data = new Array(30).fill(0).map((_,idx) => {
      
      let obj = {
        user_id : idx + 1,
        room_id : Math.floor(Math.random() * 29 + 1),
        createdAt : new Date(),
        updatedAt : new Date(),
      }

      return  obj
    })
    
    return queryInterface.bulkInsert('user_room', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('user_room', null, {});
  } 
};
