import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async(req, res)=>{
    try {
        const senderId = req.user 
        const receiverId = req.params.id
        const {message} = req.body

        let gotConversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })
        
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }
        await gotConversation.save()        

        // socket io
        return res.status(200).json({
            message: "new messsage created",
            success: true,
            newMessage
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: error.message,
            success: false,
        })
    }
}

export const getMessage = async(req, res)=>{
    try {
        const senderId = req.user 
        const receiverId = req.params.id

        console.log(senderId, receiverId)

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages")

        if(!conversation){
            return res.status(400).json({
                message: "convo not found",
                success: false
            })
        }

        return res.status(200).json({
            messages: conversation.messages,
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error.message,
            success: false,
        })
    }
}