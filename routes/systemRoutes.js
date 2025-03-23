const express = require("express");
const os = require("os");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    freeMemory: (os.freemem() / os.totalmem() * 100).toFixed(2) + "% Free",
    cpuUsage: os.loadavg(),
  });
});

module.exports = router;
