const express = require("express");
require('dotenv').config();
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Top 100 Movies API" });
});

require("./routes/movie")(app);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`);
});

module.exports = app
