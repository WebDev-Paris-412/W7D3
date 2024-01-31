const { model, Schema } = require("mongoose")

const discussionSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			maxLength: 30,
			minLength: 2,
		},
		picture: String,
		admin: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		listOfUsers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
)

const Discussion = model("Discussion", discussionSchema)

module.exports = Discussion
