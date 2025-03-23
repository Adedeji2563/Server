const express = require("express");
const config = require("./config");
const rateLimiter = require("./middleware/rateLimit");
const userRoutes = require("./routes/userRoutes");
const systemRoutes = require("./routes/systemRoutes");
const logRoutes = require("./routes/logRoutes");

const app = express();
app.use(express.json());
app.use(rateLimiter);

app.use("/users", userRoutes);
app.use("/system", systemRoutes);
app.use("/logs", logRoutes);

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
