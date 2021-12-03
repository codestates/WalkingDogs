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
    const bcrypt = require('bcrypt')
    const password = '1q2w3e4r!'
    
    const userData = new Array(30).fill(0).map((_,idx) => {
      const hashedPass = bcrypt.hashSync(password, 10)

      let obj = {
        username : "name" + (idx + 1), 
        email : "test" + (idx + 1) + "@wd.link",
        password : hashedPass, 
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
