require("dotenv/config")
require("./../config/dbConnect")
const Discussion = require("./../models/Discussion.model.js")
const Message = require("./../models/Message.model.js")

const message = "Welcome"

;(async function () {
	try {
		await Message.deleteMany({})
		const allDiscussions = await Discussion.find()

		for (const discussion of allDiscussions) {
			const creator = discussion.admin
			const content = message

			const messageToCreate = { creator, content, discussion: discussion._id }
			await Message.create(messageToCreate)
		}
	} catch (error) {
		console.log(error)
	} finally {
		process.exit()
	}
})()

Array.prototype.asyncForEach = async function (cb) {
	for (let i = 0; i < this.length; i++) {
		await cb(this[i], i, this)
	}
}
