import { connect } from "../db.js";

const episodeFilmController = {
    getEpisodeFilm: async (req, res) => {
        var sql = "SELECT * FROM episode_film ";
        const [result] = await connect.query(sql);
        res.json(result);
    },
    getEpisodeFilmById: async (req, res) => {
        const filmID = req.params.filmID;
        var sql = "SELECT * FROM episode_film WHERE filmID = " + filmID + " ORDER BY episodeID DESC";
        try {
            const [result] = await connect.query(sql);
            res.json(result);
        } catch (error) { console.log(error); }
    },
    getEpisodeFilmByEpisodeId: async (req, res) => {
        const filmID = req.params.filmID;
        const episodeID = req.query.episodeID;

        var sql = "SELECT * FROM episode_film WHERE filmID = " + filmID + " AND episodeID = " + episodeID;
        try {
            const [result] = await connect.query(sql);
            res.json(result)
        } catch (error) { console.log(error) };
    },
    addEpisode: async (req, res) => {
        const { filmID, episodeID, url } = req.body;
        var sql = "INSERT INTO episode_film( filmID, episodeID, url ) VALUES (?,?,?)";
        try {
            const [result] = await connect.query(sql, [filmID, episodeID, url]);
            res.json(true);
        } catch (error) {
            console.log(error);
            res.json(false);
        }
    },
}

export default episodeFilmController;