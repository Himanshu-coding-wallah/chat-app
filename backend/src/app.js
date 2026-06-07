import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


// routes
import userRouter from "./routes/user.route.js"
import messageRouter from "./routes/message.route.js"

app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)

export default app