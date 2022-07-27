'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Joseph Wamaitha',
      email: 'john@wamaitha.com',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ann Muriuki',
      email: 'ann@muriuki.com',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Steve Wathee',
      email: 'steve@wanyee.com',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
