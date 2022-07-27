const db = require("../models");
const yup = require("yup")
const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponse');
const { Movie, User } = db;
const Op = db.Sequelize.Op;

const movieValidationSchema = yup.object().shape({
    title: yup.string().required(),
    rating: yup.number().positive().integer(),
    userId: yup.number().required(),
});

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Movie.findByPk(id)
        if (data) {
            return sendSuccessResponse(res, 200, data)
        }
        sendErrorResponse(res, 404, "Not Found")
    } catch (error) {
        sendErrorResponse(res, 500, "Error retrieving movie")
    }

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

const create = async (req, res) => {
    try {
        const { title, rating, userId } = req.body
        await movieValidationSchema.validate({ title, rating, userId })
        const movie = {
            title,
            rating,
            userId
        };
        const data = await Movie.create(movie)
        sendSuccessResponse(res, 201, data)
    } catch (error) {
        sendErrorResponse(res, 500, error.message || "Error creating movie", error)
    }
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
    deleteOne,
    movieValidationSchema
}