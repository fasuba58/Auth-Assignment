const express = require("express");
const path = require("path")
const app = express();
const port = 5000;
const ejs = require("ejs");


const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const mongoose= require("mongoose");
// const DB_URI = "mongodb://0.0.0.0:27017/test;"
const DB_URI ="mongodb+srv://brightfash:7yl7fNl5ZlhJQYhy@edsa.llkkf8k.mongodb.net/test";

const session = require('express-session');
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false,
}));

// const User = require('../models/users');

// app.get('/profile', async (req, res) => {
//   try {
//     const allUsers = await User.find();
//     res.render('profile', { users: allUsers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal server error');
//   }
// });
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname,"/public")));


app.get('/', (req, res) => {
  
  res.render('signup.ejs', {email, name, password, confirm_password});
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
// app.use("/users", usersRouter);
// app.use("/about", aboutRouter);
// app.use('/index', indexRouter);
app.get("/",(req, res)=>{
  res.cookie("new user", "true", {
    maxAge:50000000000,
    httpOnly:true,
    expires:new Date("2024-04-20"),
    path: "/visit",
    secure:true,
  });
  res.send("welcome to EDSA");
})

mongoose
.connect(DB_URI)
.then(() =>{
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})
.catch((err)=>{
  console.log(err);
});

