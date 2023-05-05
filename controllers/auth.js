const userSchema = require("../models/users");

const bcrypt = require("bcryptjs");
const signup_get = async (req, res, next) =>{
return res.render("signup", { error: ""}); 
};

const signup_user = async (req, res, next) => {
    const {email, name, password, confirm_password} =req.body;
    try {
        if(password !== confirm_password) return res.render("signup", {error:"passwords does not match"})
    const user = await userSchema.findOne({email});
// if(user) return res.render("signup", {error:"email already exists"});

const hashed =  bcrypt.hashSync(password, 10);
console.log(hashed);

const newUser = new userSchema({
    email,
    password:hashed,
    name,
});
    const data = await newUser.save();
    console.log(data); 
    return res.redirect("/auth/login");
    } catch (error) {
     return res.render("signup", {error: error.message});   
    }
};  
const login_get = async (req, res) =>{
    try {
        return res.render("login", {error: ""});
    } catch (error) {
    console.log(error);
    return res.render("login", {error: error.message}) ;   
    }
};
const login_post = async (req, res, next) =>{
    const { email, password} = req.body;
    try {
        if (!email || !password) return res.render("login", {error: `email or password required`});
        var user = await userSchema.findOne({ email });
        if(!user) return res.render("login", {error: `email or password incorrect1` });
        const comparePwd = await bcrypt.compare(password, user.password);
        console.log(comparePwd);
        if (!comparePwd) return res.render("login", {error: `email or password incorrect2`});
        user.password = undefined;
        // await user.save();
        req.user= user;
        // req.session.userId = user._id
        return res.render("profile", {user});
    } catch (error) {
    console.log(error);
    return res.render("login", {error: error.message}) ;   
    }
};

// const profile_get = async (req, res) => {
//     const { name } = req.user;
//     return res.render("profile", { name });
//   };
  
  const profile_get = async (req, res, next) => {
    try {
      const user = await userSchema.findById(req.user.id);

      res.render('profile', { });
    } catch (err) {
      next(err);
    }
  };
//   const everyUsers = (req, res)=> {
//     let users =  userSchema.find();
   
//     {
//         console.log(users);
//         res.render("others", {users});
//        } 
//     };
const everyUsers = async (req, res) => {
    try {
      const users = await userSchema.find();
      res.render("others", { users });
    } catch (error) {
      console.log(error);
      res.render("error", { error });
    }
  };



module.exports = {
    signup_user,
    signup_get,
    login_get,
    login_post,
    profile_get,
    everyUsers,
};
