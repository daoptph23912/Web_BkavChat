var express = require("express");
var router = express.Router();
var controller = require("../controllers/user.controller");
var validate = require("../validates/user.validate");
var authMiddleware = require("../middlewares/auth.middleware");
router.get("/register", controller.register);

router.post("/register", validate.registerPost, controller.registerPost);

router.get("/login", controller.login);

router.get("/", controller.login);

router.post("/login", validate.loginPost, controller.loginPost);

module.exports = router;
