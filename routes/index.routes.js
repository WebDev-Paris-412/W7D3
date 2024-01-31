const router = require("express").Router()
const User = require("./../models/User.model")
const Message = require("./../models/Message.model")

router.use("/discussions", require("./discussions.routes"))
router.use("/messages", require("./messages.routes"))

module.exports = router
