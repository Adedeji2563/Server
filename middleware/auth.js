const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded
    next();
  } catch (ex) {
    res.status(403).json({ message: "Invalid token" });
  }
};
