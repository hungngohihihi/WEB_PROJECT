import { connect } from "../db.js";

const commentController = {
    addComment: async (req, res) => {
        const { comment, userID, commentParentID, likeCount, filmID, episodeID } = req.body;

        var sql = "INSERT INTO comment( comment, userID, commentParentID, likeCount, filmID, episodeID ) VALUES (?,?,?,?,?,?)";
        try {
            const [result] = await connect.query(sql, [comment, userID, commentParentID, likeCount, filmID, episodeID]);
            res.json(true);
        } catch (error) {
            console.log(error);
            res.json(false);
        }
    },
    getComment: async (req, res) => {
        const filmID = req.query?.filmID;
        const episodeID = req.query?.episodeID !== "undefined" ? req.query.episodeID : null;
        var sql;
        if (episodeID === null) {
            sql = "SELECT commentID, comment, comment.userID, login_user.avatar, userName, commentParentID, DATE_FORMAT(time, '%H:%i %d-%m-%Y') AS time, likeCount, filmID, episodeID FROM comment JOIN login_user ON comment.userID = login_user.userID AND comment.filmID = ? AND comment.episodeID IS ? ORDER BY comment.time DESC";
        }
        else {
            sql = "SELECT commentID, comment, comment.userID, login_user.avatar, userName, commentParentID, DATE_FORMAT(time, '%H:%i %d-%m-%Y') AS time, likeCount, filmID, episodeID FROM comment JOIN login_user ON comment.userID = login_user.userID AND comment.filmID = ? AND comment.episodeID = ? ORDER BY comment.time DESC";
        }
        try {
            const [result] = await connect.query(sql, [filmID, episodeID]);
            var comment = [];
            const commentParent = result.filter((comment) => {
                return comment.commentParentID === null;
            });
            commentParent.map((commentParent) => {
                const commentChild = result.filter((comment) => {
                    return comment.commentParentID === commentParent.commentID;
                });
                comment.push({
                    commentParent,
                    commentChild,
                });
            });
            res.json(comment);
        } catch (error) {
            console.log(error);
        }
    },
}

export default commentController;