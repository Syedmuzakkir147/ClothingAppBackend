const express = require("express")
const { signup, login, logout, getProfile } = require("../controller/auth.controller") 
const verifyToken = require("../middleware/authMiddleware");

const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.get("/profile",verifyToken,getProfile);

AuthRouter.post("/logout", (req,res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(200).json({message: "Logged out successfully"})
})

module.exports = {AuthRouter};


