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

    const roomData = new Array(30).fill(0).map((_,idx) => {
      
      let obj = {
        title : "room" + (idx + 1),
        member_limit: Math.floor(Math.random() * 5 + 1),
        leader_id : Math.floor(Math.random() * 29 + 1),
        latitude : '33.450701',
        longitude : '126.570667',
        address : 'address',
        meeting_time : new Date(),
        createdAt : new Date(),
        updatedAt : new Date(),
      }

      return  obj
    })
    
    return queryInterface.bulkInsert('room', roomData)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    return queryInterface.bulkDelete('room', null, {});
  }
};
