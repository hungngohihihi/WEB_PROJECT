import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jsonwebtoken.verify(token, process.env.PASSWORD_TOKEN);
        next();
    } catch (e) {
        if(e instanceof jsonwebtoken.JsonWebTokenError){
            res.json({error: "Token time out"});
        }
        else return res.sendStatus(403);
    }
}
export default verifyToken;