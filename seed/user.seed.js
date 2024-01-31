require("dotenv/config")
require("./../config/dbConnect")
const User = require("./../models/User.model.js")

const usersToCreate = [
	{
		username: "Evan",
	},
	{
		username: "María",
	},
	{
		username: "Julien",
	},
	{
		username: "Samara",
	},
	{
		username: "Michaël",
	},
]

;(async function () {
	try {
		await User.deleteMany({})
		const createdUsers = await User.create(usersToCreate)
		console.log(`Created ${createdUsers.length} users.`)
	} catch (error) {
		console.log(error)
	} finally {
		process.exit()
	}
})()
// async function seed() {}

// seed()
