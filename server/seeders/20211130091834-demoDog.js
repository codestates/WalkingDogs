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

    const breedList = ['비숑 프리제', '푸들', '진돗개', '치와와', '허스키', '골든 리트리버']
    const genderList = ['암컷', '수컷']

    const dogData = new Array(30).fill(0).map((_,idx) => {
      
      let obj = {
        user_id : Math.floor(Math.random() * 29 + 1),
        name : "dog" + (idx + 1),
        breed : breedList[Math.floor(Math.random() * 6)],
        gender : genderList[Math.floor(Math.random() * 2)],
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
