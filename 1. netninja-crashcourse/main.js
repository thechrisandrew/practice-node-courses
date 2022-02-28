const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Routes
// ----------------------------------
const blogRoutes = require("./routes/blogRoutes");

//Configs
// ----------------------------------
const port = 3000;

// Initialize Express and Set view engine to ejs
// ----------------------------------
const app = express();
app.set("view engine", "ejs");

//DB Connect
// ----------------------------------
mongoose
	.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log("connected to database successfully"))
	.catch((err) => console.log(`error connecting to database: ${err}`));

// Middlewares:
// ----------------------------------
// Set public folder for static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// morgan for logging
app.use(morgan("tiny"));

// Routes
// ----------------------------------
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
	res.redirect("/about");
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
	res.status(404).sendFile("./views/404.html", { root: __dirname });
});

// Opens the server by listening to the port
// ----------------------------------
app.listen(port, () => {
	console.log(`Example app listening on port: ${port}`);
});
