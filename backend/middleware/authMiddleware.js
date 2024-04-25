import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import generateAvatar from "../utils/generateAvatar.js";

const checkToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded?.userId);
            req.user = user;
        }
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

const checkUser = async (req, res, next) => {
    try {
        const {username, chatId} = req.body;
        const userFromToken = req.user;

        if (username !== userFromToken?.username) {
            const findUser = await User.findOne({username});
            if (findUser) {
                return res.status(400).json({error: "Username already exists but not yours"});
            }

            const avatar = await generateAvatar();
            const newUser = new User({
                username,
                profilePic: avatar,
                chatId,
            });
            await newUser.save();
            req.user = newUser;
        }

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export default {checkToken, checkUser};
