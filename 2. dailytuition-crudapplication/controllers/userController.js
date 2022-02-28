const e = require("express");
const User = require("./../models/user");

exports.create = (req, res) => {
	// request validation
	if (!req.body) {
		res.status(400).send({ message: "invalid content" });
		return;
	}

	const user = new User(req.body);

	user.save()
		.then((result) => {
			// res.send(result);
			res.redirect("/");
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Something went terribily wrong" });
			console.log(err);
		});
};

exports.find = (req, res) => {
	// request validation
	if (req.query.id) {
		const id = req.query.id;

		User.findById(id).then((result) => {
			if (!result) {
				res.status(500).send({ message: "Something went terribily wrong" });
			} else {
				res.send(result);
			}
		});
	} else {
		User.find()
			.then((result) => {
				res.send(result);
			})
			.catch((err) => {
				res.status(500).send({ message: err.message || "Something went terribily wrong" });
			});
	}
};

exports.update = (req, res) => {
	// request validation
	if (!req.body) {
		res.status(400).send({ message: "invalid content" });
		return;
	}

	const id = req.params.id;

	User.findByIdAndUpdate(id, req.body)
		.then((result) => {
			if (!result) {
				res.status(500).send({ message: "Something went terribily wrong" });
			} else {
				res.send(result);
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Something went terribily wrong" });
		});
};

exports.delete = (req, res) => {
	// request validation
	if (!req.body) {
		res.status(400).send({ message: "invalid content" });
		return;
	}

	const id = req.params.id;

	User.findByIdAndDelete(id)
		.then((result) => {
			if (!result) {
				res.status(500).send({ message: "Something went terribily wrong" });
			} else {
				res.send(result);
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Something went terribily wrong" });
		});
};
