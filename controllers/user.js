const userSchema = require("../models/users");
//  const express = require("express");
//  const app = express();
// const User = require('../models/user');
// const userController = require("../controllers/user");

const User = require('../models/users');
const { all } = require("../routes/auth");

async function getUsers(req, res) {
  let allUsers = await User.find();
  console.log(allUsers);
  res.render('profile', {users: allUsers});
}

getUsers;

const everyUsers = async(req, res)=> {
    let user = await User.find();
   
    user.forEach(user => {
       if (user.render) {
        console.log(user);
        res.render("others", {users: allUsers});
       } 
    });
  };

const profile_get = async (req, res) =>{
    try {
        // const user = await userSchema.findById(req.user._id);
        // const name = user.name;
        console.log("req.user", req.user);
         res.render("profile");
    } catch (error) {
        console.log(error);
    }
};
module.exports ={
    profile_get,
    getUsers,
    everyUsers,
};