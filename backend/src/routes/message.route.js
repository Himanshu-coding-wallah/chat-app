import express from "express"
import { sendMessage } from "../controllers/message.controller.js"
import { verifyUser } from "../middlewares/auth.middleware.js"

const messageRouter = express.Router()

// POST /api/message/send
messageRouter.route("/send/:id").post(verifyUser, sendMessage)

export default messageRouter