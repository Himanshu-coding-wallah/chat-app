import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export async function verifyUser(req, res, next){
    try {
        const token = req.cookies.token
    
        if(!token){
            return res.status(404).json({
                message: "token not found"
            })
        }
    
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decoded){
            return res.status(400).json({
                message: "token is invalid"
            })
        }
        const user = await User.findById(decoded.id).select("-password")
        
        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        req.user = decoded.id
        
        next()

    } catch (error) {
        return res.status(400).json({
            error
        })
    }

}