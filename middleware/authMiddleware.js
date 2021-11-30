const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  //если это обычные запросы post,get...
  try {
    const token = req.headers.authorization.split(" ")[1]; //'Bearer TOKEN' from Front - достаю токен
    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decodedToken = jwt.verify(token, config.get("jwtSecretKey"));
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not Authorized" });
  }
};
