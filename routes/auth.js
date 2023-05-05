const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");




router.post("/signup", authController.signup_user);
router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/others",authController.everyUsers );

module.exports = router; 