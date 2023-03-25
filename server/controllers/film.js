import { connect } from "../db.js";

const filmController = {
    addFilm: async (req, res) => {
        const {
            filmName,
            status,
            year,
            duration,
            description,
            category,
            url,
        } = req.body;

        var sql = "INSERT INTO film( filmName, status, year, duration, description, category, url ) VALUES (?,?,?,?,?,?,?)";
        try {
            const [result] = await connect.query(sql, [filmName, status, year, duration, description, category, url]);
            res.json(true);
        } catch (error) {
            console.log(error);
            res.json(false);
        }
    },
    getFilm: async (req, res) => {
        var sql = "SELECT film.*, COUNT(DISTINCT episode_film.episodeID) as episodeCount, AVG(rate_film.rate) as point FROM film LEFT JOIN  episode_film ON film.filmID = episode_film.filmID LEFT JOIN rate_film ON film.filmID = rate_film.filmID  GROUP BY filmID order by COUNT(episode_film.filmID) DESC";
        try {
            const [result] = await connect.query(sql);
            res.json(result)
        } catch (error) {
            console.log(error);
        }

    },
    getFilmByName: async (req, res) => {
        const filmName = req.params.name;
        var sql = "SELECT film.*, ROUND(AVG(rate), 2) as point FROM film LEFT JOIN rate_film ON rate_film.filmID = film.filmID WHERE filmName = " + "'" + filmName + "'" + "GROUP BY filmID";
        try {
            const [result] = await connect.query(sql);
            res.json(result[0]);
        } catch (error) { console.log(error) };
    },
}

export default filmController;