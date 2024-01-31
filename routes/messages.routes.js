const router = require("express").Router()
const Message = require("./../models/Message.model")

router.post("/:discussionId", async (req, res, next) => {
	try {
		console.log(req.body)
		const { content } = req.body
		const creatorId = req.user._id
		const discussionId = req.params.discussionId
		const myMessage = {
			content,
			creator: creatorId,
			discussion: discussionId,
		}
		const createdMessage = await Message.create(myMessage)
		res.status(201).json({
			messageId: createdMessage._id,
			message: "Succesfully created a message, thanks.",
		})
		res.json(req.body)
	} catch (error) {
		console.log(error)
	}
})

router.delete("/:messageId", async (req, res, next) => {
	try {
		const message = await Message.findOneAndDelete({
			creator: req.user._id,
			_id: req.params.messageId,
		})
		if (!message) {
			return res.status(401).json({ message: "Unauthorized" })
		}

		res.sendStatus(204)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
