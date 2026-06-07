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

app.use('/api/user', userRouter)

export default app