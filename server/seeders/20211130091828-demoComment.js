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

    const commentData = new Array(30).fill(0).map((_,idx) => {
      
      let obj = {
        message : "message" + (idx + 1),
        room_id : Math.floor(Math.random() * 29 + 1),
        user_id : Math.floor(Math.random() * 29 + 1),
        createdAt : new Date(),
        updatedAt : new Date(),
      }

      return  obj
    })
    
    return queryInterface.bulkInsert('comment', commentData)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('comment', null, {});
  }
};
