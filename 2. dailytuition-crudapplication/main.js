const express = require("express");
const morgan = require("morgan");

const DBConnect = require("./helpers/database");

const port = 3000;
const app = express();
app.set("view engine", "ejs");

DBConnect();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/", require("./routes/router"));

app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
});
