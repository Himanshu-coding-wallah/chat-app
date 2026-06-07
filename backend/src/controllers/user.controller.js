
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import uploadToImageKit from "../utils/imagekit.js";
import jwt from "jsonwebtoken"

export const register = async(req, res)=>{
    try {
        const {fullName, userName, password, confirmPassword,email, gender} = req.body

        const profilePhoto = req.file?.buffer?.toString("base64")

        if(!fullName || !userName || !password || !email || !confirmPassword || !gender || !profilePhoto){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message: "password do not match"
            })
        }

        const isExist = await User.findOne({email})

        if(isExist){
            return res.status(400).json({
                message: "User already exist"
            })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const data = await uploadToImageKit(profilePhoto, "profilePhoto")

        const user = await User.create({
            fullName, 
            userName, 
            email,
            password: hashPass, 
            profilePhoto:data.url,
            gender  
        })

        const token = await jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1*24*60*60*1000
        })

        return res.status(201).json({
            message: "user is registered",
            user
        })
        
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body
        if( !password || !email ){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({
                message: "User do not exist"
            })
        }
        
        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass){
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }

        const token = await jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1*24*60*60*1000
        })

        return res.status(201).json({
            message: "user logged in successfully",
            user
        })
        
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("token")
    
        return res.status(200).json({
            message: "user is logged out"
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

export const getOtherUsers = async(req, res)=>{
    try {
        const loggedInUser = await User.findById(req.user).select("-password")
        const otherUsers = await User.find({_id: {$ne: loggedInUser._id}}).select("-password")

        return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        return res.status(400).json({
            message: "other users not found"
        })
    }
}