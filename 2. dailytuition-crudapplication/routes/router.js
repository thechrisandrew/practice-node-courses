const express = require("express");
const axios = require("axios");

const router = express.Router();

const userController = require("./../controllers/userController");

router.get("/", (req, res) => {
	axios
		.get("http://localhost:3000/api/users")
		.then((response) => {
			res.render("index", { users: response.data });
		})
		.catch((err) => {
			res.send(err);
		});
});

router.get("/add-user", (req, res) => {
	res.render("add_user");
});

router.get("/update-user", (req, res) => {
	axios
		.get("http://localhost:3000/api/users", { params: { id: req.query.id } })
		.then((result) => {
			res.render("update_user", { user: result.data });
		})
		.catch((err) => {
			res.send(err);
		});
});

// API Routes
router.post("/api/users", userController.create);
router.get("/api/users", userController.find);
router.put("/api/users/:id", userController.update);
router.delete("/api/users/:id", userController.delete);

module.exports = router;
