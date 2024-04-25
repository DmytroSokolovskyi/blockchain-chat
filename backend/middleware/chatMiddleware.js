import Chat from "../models/chat.model.js";


const checkChat = async (req, res, next) => {
    try {
        const {chatId} = req.body;
        const {user} = req;

        const oldChat = await Chat.findOne({chatId});

        if (!oldChat) {
            const newChat = await Chat.create({
                chatId,
                users: [user._id],
            });
            req.chat = newChat;
        } else {
            oldChat?.users.push(user._id);
            await oldChat.save();
            req.chat = oldChat;
        }

        next();
    } catch (error) {
        console.log("Error in checkChat middleware: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export default {checkChat};
