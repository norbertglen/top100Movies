const db = require("../models");
const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponse');
const { Movie, User } = db;
const Op = db.Sequelize.Op;

const findOne = (req, res) => {
    const { id } = req.params;
    Movie.findByPk(id)
        .then(data => data ? sendSuccessResponse(res, 200, data) : sendErrorResponse(res, 404, "Not Found"))
        .catch(err => sendErrorResponse(res, 500, "Error retrieving movie"));
};

const findAll = async (req, res) => {
    try {
        const { title, userId } = req.query;
        var where = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
        const user = await User.findByPk(userId)
        let movies
        if (user) {
            movies = await user.getMovies({ where })
        } else {
            movies = await Movie.findAll({ where })
        }
        sendSuccessResponse(res, 200, movies)

    } catch (error) {
        sendErrorResponse(res, 500, "Error retrieving movies", error)
    }

};

const create = (req, res) => {
    const { title, rating, userId } = req.body
    if (!title || !userId) {
        sendErrorResponse(res, 400, `Title & user id is required${userId} ${title}`)
        return;
    }
    const movie = {
        title,
        rating,
        userId
    };
    Movie.create(movie)
        .then(data => sendSuccessResponse(res, 201, data))
        .catch(err => sendErrorResponse(res, 500, "Error creating movie"));
};

const update = (req, res) => {
    const { id } = req.params;
    const { title, rating } = req.body
    const updates = {
        ...(title && { title }),
        ...(rating && { rating }),
    }
    Movie.update(updates, {
        where: { id }
    })
        .then(num => num == 1 ? sendSuccessResponse(res, 204) : sendErrorResponse(res, 400, "Cannot update movie"))
        .catch(err => sendErrorResponse(res, 500, "Error updating movie"));
};

const deleteOne = (req, res) => {
    const { id } = req.params;
    Movie.destroy({
        where: { id }
    })
        .then(num => num == 1 ? sendSuccessResponse(res, 204) : sendErrorResponse(res, 400, 'Cannot delete movie'))
        .catch(err => sendErrorResponse(res, 500, "Error deleting movie"));
};

module.exports = {
    findOne,
    findAll,
    create,
    update,
    deleteOne
}