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

    const userData = new Array(30).fill(0).map((_,idx) => {
      let obj = {
        username : "name" + (idx + 1), 
        email : "test" + (idx + 1) + "@wd.link",
        password : "1234", 
        image: './test.img',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
      return  obj
    })
    
    return queryInterface.bulkInsert('user', userData)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('user', null, {})
  }
};
