const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Top 100 Movies API" });
});

require("./routes/movie")(app);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`);
});

module.exports = app