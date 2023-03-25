import { connect } from "../db.js";

const userController = {
  signUp: async (req, res) => {
    const { account, password } = req.body;
    var sql =
      "SELECT userID, userName, avatar FROM login_user WHERE account = ? AND password = ?";
    try {
      const [result] = await connect.query(sql, [account, password]);
      if (result[0] != null) {
        res.json({
          login: true,
          id: result[0].userID,
          userName: result[0].userName,
          avatar: result[0].avatar,
        })
      } else res.json({ login: false })
    }
    catch (error) {
      console.log(error);
    }
  },

  register: async (req, res) => {
    const { account, password, userName, dateOfBirth, avatarUrl } = req.body;
    var sql = "SELECT userID FROM login_user WHERE account = ? "
    try {
      const [accountConflict] = await connect.query(sql, [account]);
      if (accountConflict[0] != null) res.json({ register: false });
      else {
        sql = "INSERT INTO login_user(account, password, userName, dateOfBirth, avatar, status) VALUES(?,?,?,?,?,0)"
        try {
          const [result] = await connect.query(sql, [account, password, userName, dateOfBirth, avatarUrl]);
          res.json({ register: true });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  changePassword: async (req, res) => {
    const { account, oldPassword, newPassword } = req.body;
    var sql =
      "SELECT userID FROM login_user WHERE account = ? AND password = ?";
    try {
      const [result] = await connect.query(sql, [account, oldPassword]);
      if (result[0] != null) {
        var sql2 = "UPDATE login_user SET password = ? WHERE userID = ?";
        const [result2] = await connect.query(sql2, [newPassword, result[0].userID]);
        res.json({
          change: true,
          id: result[0].userID,
        })
      } else res.json({ change: false })
    }
    catch (error) {
      console.log(error);
    }
  },

};
export default userController;
