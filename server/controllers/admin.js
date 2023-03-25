import { connect } from "../db.js";
import filmData from "../FILE_URL/film.json"  assert { type: "json" };
import episodeData from "../FILE_URL/episodeFilm.json"  assert { type: "json" };
import * as dotenv from 'dotenv';
import jsonwebtoken from "jsonwebtoken";
dotenv.config();
const adminController = {
  login: async (req, res) => {
    const { account, password } = req.body;
    var sql = "SELECT adminName, adminID, avatar FROM login_admin WHERE account = ? AND password = ?";
    try {
      const [admin] = await connect.query(sql, [account, password]);
      if (admin[0]) {
        const adminToken = "Bearer " + jsonwebtoken.sign(admin[0], process.env.PASSWORD_TOKEN, {
          expiresIn: "1800s"
        });
        res.json(adminToken);
      }
      else res.sendStatus(401);
    } catch (error) {
      console.log(error);
    }
  },
  autoUpdateFilm: async (req, res) => {
    if (req.params.passwordUpdate === process.env.PASSWORD_INSERT) {
      var valuesEpisodeNull = [];
      var valuesFilmNull = [];
      var sql = "SELECT film.filmID, episode_film.episodeID, film.filmName FROM film LEFT JOIN episode_film ON film.filmID = episode_film.filmID";
      try {
        const [film] = await connect.query(sql);
        filmData.map((newFilm) => {
          const findFilm = film.find((oldFilm) => {
            return oldFilm.filmName === newFilm.filmName;
          })
          if (!findFilm) {
            const checkExist = valuesFilmNull.find((fi) => {
              return fi[0] === newFilm.filmName;
            })
            if (!checkExist)
              valuesFilmNull.push([newFilm.filmName, newFilm.status, newFilm.year, newFilm.duration, newFilm.description, newFilm.category, newFilm.url]);
          }
        })
        if (valuesFilmNull[0] != null) {
          try {
            sql = "INSERT INTO film( filmName, status, year, duration, description, category, url ) VALUES ?";
            const [statusInsertFilm] = await connect.query(sql, [valuesFilmNull]);
          } catch (error) {
            console.log(error)
          }
        }
        sql = "SELECT film.filmID, episode_film.episodeID, film.filmName FROM film LEFT JOIN episode_film ON film.filmID = episode_film.filmID";
        const [newFilm] = await connect.query(sql);
        episodeData.map((episode) => {
          const check = newFilm.find((fi) => {
            return fi.filmName === episode.filmName && Number(fi.episodeID) === Number(episode.episodeID);
          })
          if (!check) {
            const findFilm = newFilm.find((fi) => {
              return fi.filmName === episode.filmName;
            })
            if (findFilm) {
              const checkExist = valuesEpisodeNull.find((newEpisode) => {
                return Number(newEpisode[1]) === Number(episode.episodeID) && Number(newEpisode[0]) === Number(findFilm.filmID);
              })
              if (!checkExist) valuesEpisodeNull.push([findFilm.filmID, episode.episodeID, episode.url]);
            }
          }
        })
        sql = "INSERT INTO episode_film(filmID, episodeID, url) VALUES ?"
        try {
          if (valuesEpisodeNull[0] != null) {
            const [statusInsertEpisode] = await connect.query(sql, [valuesEpisodeNull]);
          }
        } catch (error) {
          console.log(error);
        }
        res.json("Update thành công");
      } catch (error) { console.log(error) };
    } else res.json("Bạn không có quyền truy cập trang web này");
  },

  deleteFilmByFilmID: async (req, res) => {
    const { filmID } = req.body;
    var sql =
      "SELECT * FROM film WHERE filmID = ?";
    try {
      const [result] = await connect.query(sql, [filmID]);
      if (result[0] != null) {
        var sql2 = "DELETE FROM film WHERE filmID = ?";
        const [result2] = await connect.query(sql2, [result[0].filmID]);
        res.json({
          delete: true,
          id: result[0].filmID,
        })
      } else res.json({ delete: false })
    }
    catch (error) {
      console.log(error);
    }
  },
  listAdminAccount: async (req, res) => {
    var sql = "SELECT * FROM login_admin";
    try {
      const [result] = await connect.query(sql);
      res.json(result)
    } catch (error) {
      console.log(error);
    }
  },
  listUserAccount: async (req, res) => {
    var sql = "SELECT * FROM login_user";
    try {
      const [result] = await connect.query(sql);
      res.json(result)
    } catch (error) {
      console.log(error);
    }
  }
};
export default adminController;
