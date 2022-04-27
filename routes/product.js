const express = require("express");
const router = express.Router()
const proController = require("../controllers/product.controller")
const fileuploadMiddleware = require("../middlewares/fileupload")

router.route("/save")
    .post(fileuploadMiddleware.fileupload,proController.save)

router.route("/find")
    .post(proController.find)
router.route("/findifo")
    .post(proController.findifo);
router.route("/findAll")
    .get(proController.findAll);
router.route("/taskupdate")
    .post(proController.taskupdate)
router.route("/stateupdate")
    .post(proController.stateupdate)
router.route("/userremove")
    .post(proController.userstateupdate)
router.route("/endstateupdate")
    .post(proController.endstateupdate)
router.route("/allremove")
    .post(proController.tasksremove)


router.route("/giveup")
    .post(proController.giveup)
router.route("/yanzheng")
    .post(proController.yanzheng)
module.exports = router