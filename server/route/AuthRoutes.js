const { Router } = require("express");
const {signup,login,getUserInfo} = require( "../controller/AuthController.js");
const {verifyToken} = require("../middleware/AuthMiddleWare.js")
const authRoutes = Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/user-info",verifyToken,getUserInfo)
module.exports = authRoutes;