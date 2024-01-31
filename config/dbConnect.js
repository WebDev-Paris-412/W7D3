const mongoose = require("mongoose")

mongoose
	.connect(process.env.MONGODB_URI_DEV)
	.then((db) => {
		console.log(`Connected to ${db.connection.name}`)
	})
	.catch((error) =>
		console.log("Error when connecting the the Database: ", error)
	)
