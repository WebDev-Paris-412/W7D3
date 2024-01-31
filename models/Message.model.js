const { model, Schema } = require("mongoose")

const messageSchema = Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		discussion: {
			type: Schema.Types.ObjectId,
			ref: "Discussion",
		},
		content: {
			type: String,
			maxLength: 50000,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Message = model("Message", messageSchema)

module.exports = Message
