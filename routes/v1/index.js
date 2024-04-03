const router = require("express").Router();
const v1 = require("../../controllers/v1");

router.get("/", v1.movies.welcome);
router.get("/movies", v1.movies.listMovies);
router.post("/movies", v1.movies.addMovies);
router.get("/movies/:id", v1.movies.getSpecificMovies);
router.put("/movies/:id", v1.movies.editMovies);
router.delete("/movies/:id", v1.movies.deleteMovies);

module.exports = router;
