import Chat from "../models/chat.model.js";
import {io} from "../socket/socket.js";

const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find()
        io.emit("updatedChats", chats);
        res.status(200).json(chats);

    } catch (error) {
        console.error("Error in chats controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};
const getUserChats = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const userChats = await Chat.find({users: loggedInUserId});

        res.status(200).json(userChats);
    } catch (error) {
        console.error("Error in chats controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};
export default {getAllChats, getUserChats};

