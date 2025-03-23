const express = require("express");
const fs = require("fs");
const auth = require("../middleware/auth");

const router = express.Router();
const logFile = "logs.txt";

router.get("/", auth, (req, res) => {
  if (!fs.existsSync(logFile)) return res.json({ logs: [] });
  const logs = fs.readFileSync(logFile, "utf-8").split("\n").filter(log => log);
  res.json({ logs });
});

router.post("/", auth, (req, res) => {
  const { action } = req.body;
  const log = `${new Date().toISOString()} - ${req.user.username}: ${action}\n`;
  fs.appendFileSync(logFile, log);
  res.json({ message: "Log added" });
});

module.exports = router;
