const router = require("express").Router()

const SendController = require('../controller/SendController')

//middlewares
const verifyToken = require('../helpers/verify.token');

router.post("/simple", verifyToken, SendController.sendSimple)
router.get("/all", verifyToken, SendController.getAllUserSends)




module.exports = router