import express from "express"
import { getMessage, sendMessage } from "../controllers/message.controller.js"
import { verifyUser } from "../middlewares/auth.middleware.js"

const messageRouter = express.Router()

// POST /api/message/send
messageRouter.route("/send/:id").post(verifyUser, sendMessage)

// GET /api/message/receive
messageRouter.route("/receive/:id").get(verifyUser, getMessage)

export default messageRouter