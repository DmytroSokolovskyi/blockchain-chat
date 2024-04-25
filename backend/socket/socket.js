import {Server} from "socket.io";
import http from "http";
import express from "express";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    const user = await User.findById(userId);

    io.emit("getUser", user);
    socket.broadcast.emit('getNewUser', user);


    try {
        const chats = await Chat.find();

        io.emit("updatedChats", chats);
    } catch (error) {
        console.error("Error fetching chats:", error);
    }


    socket.on("sendMessage", async (message) => {
        try {
            const chat = await Chat.findOne({chatId: message?.chatId});

            const newMessage = new Message({
                senderId: message.senderId,
                chatId: chat._id,
                message: message.message,
            });

            chat.messages.push(newMessage._id);
            await Promise.all([chat.save(), newMessage.save()]);

            const chats = await Chat.findOne({chatId: message?.chatId}).populate("messages");

            io.emit("updatedChat", chats);
        } catch (error) {
            console.error("Error handling message:", error);
        }
    });


    socket.on('updateChatId', async ({chatId}) => {
        try {
            const userUpdated = await User.findByIdAndUpdate(user._id, {chatId});
            const chat = await Chat.findOne({chatId}).populate("messages");

            io.emit("getUser", userUpdated);
            io.emit("updatedChat", chat);
        } catch (error) {
            console.error('Error updating chatId:', error);
        }
    });


    socket.on('getMessages', async (chatId) => {
        try {

            const chat = await Chat.findOne({chatId}).populate("messages");

            io.emit("updatedChat", chat);
        } catch (error) {
            console.error('Error updating getMessages:', error);
        }
    });


    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

export {app, io, server};
