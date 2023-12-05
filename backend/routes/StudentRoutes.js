const router = require("express").Router()

const StudentController = require("../controller/StudentController");

//middlewares
const verifyToken = require("../helpers/verify.token");

router.post('/create', verifyToken, StudentController.create);
router.get("/all", verifyToken, StudentController.getAll);
router.get("/:id", verifyToken, StudentController.getStudentById);
router.patch("/edit/:id", verifyToken, StudentController.editStudent);
router.delete("/:id", verifyToken, StudentController.removeStudentbyId);






module.exports = router