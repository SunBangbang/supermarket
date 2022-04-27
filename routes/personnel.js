const express = require("express");
const router = express.Router();

const posController = require("../controllers/personnel.controller");
const authMiddleware = require("../middlewares/authenticate");

const fileuploadMiddleware = require("../middlewares/fileupload");

// 判断用户是否登陆的接口
// router.route("/isSignin").post(authMiddleware, posController.isSignin); //登录
router.route("/isSignin").post(authMiddleware, posController.isSignin);
router
  .route("/usersSave") //注册
  .post(fileuploadMiddleware.fileupload, posController.usersSave);

router.route("/usersSignin").post(posController.usersSignin); //登录
router.route("/repairmanSignin").post(posController.repairmanSignin); //登录
router.route("/adminSignin").post(posController.adminSignin); //登录

router.route("/usersFind").get(posController.usersFind);
router.route("/usersFindById").post(posController.usersFindById);

router.route("/usersDelete").post(posController.usersRemove);

router
  .route("/usersEdit")
  .post(fileuploadMiddleware.fileupload, posController.usersUpdate);

router
  .route("/repairmanSave")
  .post(fileuploadMiddleware.fileupload, posController.repairmanSave);

router.route("/repairmanFind").get(posController.repairmanFind);

router.route("/repairmanDelete").post(posController.repairmanRemove);
router.route("/repairmanFindById").post(posController.repairmanFindById);
router
  .route("/repairmanEdit")
  .post(fileuploadMiddleware.fileupload, posController.repairmanUpdate);

router
  .route("/adminSave")
  .post(fileuploadMiddleware.fileupload, posController.adminSave);

router.route("/adminFind").get(posController.adminFind);

//品牌类型
router
  .route("/brandSave")
  .post(fileuploadMiddleware.fileupload, posController.brandSave);

router.route("/brandFind").get(posController.brandFind);
router.route("/brandDelete").post(posController.brandRemove);

// 故障类型
router
  .route("/faultSave")
  .post(fileuploadMiddleware.fileupload, posController.faultSave);

router.route("/faultFind").get(posController.faultFind);
router.route("/faultDelete").post(posController.faultRemove);
// 备件管理
router
  .route("/sparepartSave")
  .post(fileuploadMiddleware.fileupload, posController.sparepartSave);

router.route("/sparepartFind").get(posController.sparepartFind);
router.route("/spareDelete").post(posController.spareRemove);

module.exports = router;
