const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const config = require("./config");

const router = express.Router();
const users = [];

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword, role });
  res.json({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username, role: user.role }, config.SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

router.delete("/:username", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Permission denied" });
  }
  const index = users.findIndex(user => user.username === req.params.username);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User removed" });
});

module.exports = router;
