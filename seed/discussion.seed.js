require("dotenv/config")
require("./../config/dbConnect")
const Discussion = require("./../models/Discussion.model.js")
const User = require("./../models/User.model.js")

const discussionsToCreate = [
	{
		name: "project-management",
		admin: "Julien",
		listOfUsers: ["Samara", "Michaël", "Julien"],
	},
	{
		name: "cat meme",
		admin: "María",
		listOfUsers: ["Samara", "Evan", "Julien", "María"],
	},
]

;(async function () {
	try {
		await Discussion.deleteMany({})
		const allUsers = await User.find()

		for (const discussionElement of discussionsToCreate) {
			const admin = await User.findOne({ username: discussionElement.admin })
			discussionElement.admin = admin._id
			let usersOfDiscussion = []
			for (const user of discussionElement.listOfUsers) {
				const userToAdd = await User.findOne({ username: user })
				usersOfDiscussion.push(userToAdd._id)
			}
			discussionElement.listOfUsers = usersOfDiscussion
			// console.log(discussionElement)
			await Discussion.create(discussionElement)
		}

		// console.log(allUsers)
	} catch (error) {
		console.log(error)
	} finally {
		process.exit()
	}
})()
// async function seed() {}

// seed()
