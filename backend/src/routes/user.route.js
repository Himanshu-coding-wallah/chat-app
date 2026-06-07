import express from "express"
import upload from "../middlewares/multer.middleware.js"
import { login, register } from "../controllers/user.controller.js"

const userRouter = express.Router()

// POST /api/user/register
userRouter.route('/register').post(upload.single("profilePhoto"), register)

// POST /api/user/login
userRouter.route('/login').post(login)

export default userRouter