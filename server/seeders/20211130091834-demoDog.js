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

    const size = ['대', '중', '소']
    // const breedList = ['비숑 프리제', '푸들', '진돗개', '치와와', '허스키', '골든 리트리버']
    const neuteringList = [true, false]

    const dogData = new Array(30).fill(0).map((_,idx) => {
      
      let obj = {
        user_id : Math.floor(Math.random() * 29 + 1),
        name : "dog" + (idx + 1),
        category : size[Math.floor(Math.random() * 3)],
        neutering : neuteringList[Math.floor(Math.random() * 2)],
        createdAt : new Date(),
        updatedAt : new Date(),
      }

      return  obj
    })
    
    return queryInterface.bulkInsert('dog', dogData)
  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('dog', null, {});
  }
};
