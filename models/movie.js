module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  }, {});
  Movie.associate = function (models) {
    Movie.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };
  return Movie;
};