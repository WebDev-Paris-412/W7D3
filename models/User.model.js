const { model, Schema } = require("mongoose")

const userSchema = Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			maxLength: 30,
			minLength: 2,
		},
		picture: String,
	},
	{
		timestamps: true,
	}
)

const User = model("User", userSchema)

module.exports = User
