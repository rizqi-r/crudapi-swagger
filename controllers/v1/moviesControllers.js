const { Pool } = require("pg");
const pool = new Pool({
    host: "localhost",
    database: "crudapi",
    user: "postgres",
    password: "root",
    port: 5432
});

async function welcome(req, res, next) {
    try {
        pool.query("SELECT * FROM movies", (err, result) => {
            if (!err) {
                if (result.rows) {
                    return res.json({
                        status: 200,
                        message: "OK"
                    });
                } else {
                    return res.json({
                        status: 204,
                        message: "No Content"
                    });
                }
            } else {
                return res.json({
                    status: 500,
                    message: err.message
                });
            }
        });
    } catch (error) {
        next(error);
    }
}

async function listMovies(req, res, next) {
    try {
        pool.query("SELECT * FROM movies", (err, result) => {
            if (!err) {
                return res.json({
                    status: 200,
                    rows: result.rows
                });
            } else {
                return res.json({
                    status: 500,
                    rows: err.message
                });
            }
        });
    } catch (error) {
        next(error);
    }
}

async function getSpecificMovies(req, res, next) {
    try {
        const params = Number(req.params.id);
        if (params) {
            pool.query("SELECT * FROM movies WHERE id=$1", [params], (err, query) => {
                if (!err) {
                    if (query.rows[0]) {
                        return res.json({
                            status: 200,
                            rows: query.rows
                        });
                    } else {
                        return res.json({
                            status: 404,
                            message: "Not Found"
                        });
                    }
                } else {
                    return res.json({
                        status: 500,
                        message: err.message
                    });
                }
            });
        } else {
            return res.json({
                status: 500,
                message: "Error"
            });
        }
    } catch (error) {
        next(error);
    }
}

async function addMovies(req, res, next) {
    try {
        const body = req.body;
        if (body) {
            pool.query("INSERT INTO movies (title, director, release_year, is_available) VALUES ($1, $2, $3, $4)", [body.title, body.director, Number(body.release_year), body.is_available], (err, query) => {
                if (!err) {
                    return res.json({
                        status: 201,
                        message: "Data Berhasil Dibuat"
                    });
                } else {
                    return res.json({
                        status: 500,
                        message: err.message
                    });
                }
            });
        } else {
            return res.json({
                status: 500,
                message: "Error"
            });
        }
    } catch (error) {
        next(error);
    }
}

async function editMovies(req, res, next) {
    try {
        const params = Number(req.params.id);
        const body = req.body;
        if (body && params) {
            pool.query("UPDATE movies SET title=$1, director=$2, release_year=$3, is_available=$4 WHERE id=$5", [body.title, body.director, Number(body.release_year), body.is_available, params], (err, query) => {
                if (!err) {
                    pool.query("SELECT * FROM movies WHERE id=$1", [params], (err, query) => {
                        return res.json({
                            status: 201,
                            message: "Data Berhasil Diupdate",
                            rows: query.rows
                        });
                    });
                } else {
                    return res.json({
                        status: 404,
                        message: "Not Found"
                    });
                }
            });
        } else {
            return res.json({
                status: 500,
                message: "Error"
            });
        }
    } catch (error) {
        next(error);
    }
}

async function deleteMovies(req, res, next) {
    try {
        const params = Number(req.params.id);
        if (params) {
            pool.query("DELETE FROM movies WHERE id=$1", [params], (err, query) => {
                if (!err) {
                    return res.json({
                        status: 200,
                        message: "Data Berhasil Dihapus"
                    });
                } else {
                    return res.json({
                        status: 404,
                        message: "Not Found"
                    });
                }
            });
        } else {
            return res.json({
                status: 500,
                message: "Error"
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    welcome,
    listMovies,
    addMovies,
    getSpecificMovies,
    editMovies,
    deleteMovies
};
