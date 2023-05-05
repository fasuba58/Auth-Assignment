const express = require("express");
const router = express.Router();
const userController =require("../controllers/user");
const {authCheck} = require("../middlewares/index");
const {getUsers} = require("../controllers/user")
const {everyUsers} = require("../controllers/user")

router.get("/profile", getUsers);
router.get("/others", everyUsers);

router.get('/profile', async (req, res) => {
    const allUsers = await User.find();
    res.render('profile', { users: allUsers });
  });

  // router.get('/others', async (req, res) => {
  //   const allUsers = await User.find();
  //   res.render('others', { users: allUsers });
  // });


// router.get("/profile", authCheck, userController.profile_get);
module.exports = router;