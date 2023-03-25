import { connect } from "../db.js";

const rateController = {
    rateFilm: async (req, res) => {
        const { rate, filmID, userID } = req.body;
        var sql = "SELECT * FROM rate_film WHERE filmID = ? AND userID = ?";
        try {
            const [selectRate] = await connect.query(sql, [filmID, userID]);
            if (selectRate[0]) {
                sql = "UPDATE rate_film SET rate = ? WHERE filmID = ? AND userID = ?";
                try {
                    const [statusUpdateRate] = await connect.query(sql, [rate, filmID, userID]);
                    res.json(true);
                } catch (error) {
                    res.json(false);
                    console.log(error);
                }
            }
            else {
                sql = "INSERT INTO rate_film(userID, filmID, rate) VALUES (?, ?, ?)";
                try {
                    const [statusInsertRate] = await connect.query(sql, [userID, filmID, rate]);
                    res.json(true);
                } catch (error) {
                    res.json(false);
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }


    }
}

export default rateController;