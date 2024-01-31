const router = require("express").Router()
const Discussion = require("../models/Discussion.model")
const Message = require("../models/Message.model")

/**
 * ! All routes are prefixed with:
 * ! /api/discussions
 */

router.get("/", async (req, res, next) => {
	try {
		const filter = {
			listOfUsers: {
				$in: [req.user._id],
			},
		}
		console.log(req.query)
		if (req.query.name) {
			const nameRegExp = new RegExp(req.query.name, "i")
			filter.name = nameRegExp
		}

		/**
		 * filter:
		 * {
		 *   name: /cat/i
		 * }
		 */

		const allDiscussions = await Discussion.find(filter)
			.populate({ path: "admin", select: { username: 1, _id: 1 } })
			.populate({ path: "listOfUsers", select: { username: 1, _id: 0 } })

		if (!allDiscussions.length) {
			return res.json({ message: "no discussion to show" })
		}
		res.json(allDiscussions)
	} catch (error) {
		console.log(error)
	}
})

/**
 * Return all of the messages inside a discussion
 */
router.get("/:discussionId", async (req, res, next) => {
	try {
		const { discussionId } = req.params

		const theDiscussion = await Discussion.findById(discussionId).populate(
			"admin",
			"username -_id"
		)
		const allMessages = await Message.find({
			discussion: discussionId,
		})
			.populate("creator", "username")
			.select("content creator createdAt")

		res.json({
			messages: allMessages,
			admin: theDiscussion.admin,
			name: theDiscussion.name,
		})
	} catch (error) {
		console.error(error)
	}
})

module.exports = router
