const mongoose = require("mongoose");
require("dotenv").config();

const DBConnect = async () => {
	try {
		const con = await mongoose.connect(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`Database connected successfully: @${con.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = DBConnect;
