const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token.split(" ")[1], config.SECRET_KEY);
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
