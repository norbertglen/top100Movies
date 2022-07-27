module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [{
      title: 'Game of Thrones',
      rating: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Insipid',
      rating: 2,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Merlin',
      rating: 3,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The 100',
      rating: 4,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {});
  }
};