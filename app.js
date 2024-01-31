// Load the .env variables
require("dotenv/config")

// Connect to the db
require("./config/dbConnect")

const express = require("express")
const logger = require("morgan")
const app = express()

/**
 * Middlewares
 */

app.use(logger("dev"))
// Used to read json data inside the request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Routing
 */

/**
 * Fake login for now
 */

app.use(async (req, res, next) => {
	try {
		const userId = "65ba149af5230c4eaece6804"
		const User = require("./models/User.model")
		const loggedInUser = await User.findById(userId)

		req.user = loggedInUser
		req.isLoggedIn = true
		next()
	} catch (error) {
		console.log(error)
	}
})

app.use("/api", require("./routes/index.routes"))

/**
 * 404?
 */
app.all("*", (req, res, next) => {
	res.status(404).json({
		message: "This route does not exist",
		info: "Please access the documentation at http://my-doc.com",
	})
})

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})
