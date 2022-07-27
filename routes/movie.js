module.exports = app => {
    var router = require("express").Router();
    const MoviesController = require("../controllers/movie");

    router.get("/", MoviesController.findAll);
    router.get("/:id", MoviesController.findOne);

    router.post("/", MoviesController.create);

    router.put("/:id", MoviesController.update);

    router.delete("/:id", MoviesController.deleteOne);
    
    app.use('/api/movies', router);
};