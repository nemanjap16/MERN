const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const { dbConnect } = require("./config/db.connect");
// routes
const goalRoute = require("./routes/goalRoutes");

dbConnect();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/api/goals", goalRoute);
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
