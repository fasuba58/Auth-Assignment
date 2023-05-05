const authCheck = (req, res, next) =>{
    try {
        req.user = "hey im still testing middlewares";
        next();
    } catch (error) {}
};
module.exports = {
    authCheck,
};