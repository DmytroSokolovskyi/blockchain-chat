import React, {createContext, useState, useEffect, useContext} from "react";
import {useAuthContext} from "./AuthContext.js";
import io from "socket.io-client";
import {IAuthContext, ISocketContext, IUser} from "../utils/types.js";
import * as SocketIOClient from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";

const SocketContext = createContext<ISocketContext>({
    socket: null,
    onlineUsers: [],
});

export const useSocketContext = (): ISocketContext => useContext(SocketContext);
export const apiUrl = "http://localhost:5000";
export const config = {
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
};

export const axiosInstance = axios.create(config);


export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
    const [user, setUser] = useState<IUser>();
    const {authUser}: IAuthContext = useAuthContext();

    useEffect((): any => {
        if (authUser) {
            const socket = io(apiUrl, {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            socket.on("getUser", (user: IUser) => {
                if (user._id === authUser._id) {
                    const updateUser = {...authUser, chatId: user.chatId};
                    localStorage.setItem("chat-user", JSON.stringify(updateUser));
                    setUser(updateUser);
                }
            });
            socket.on("getNewUser", (user: IUser) => {


                // setUser(authUser)
                setUser(user);
                toast.success(user.username + " has joined the chat");
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);


    return <SocketContext.Provider value={{socket, user}}>{children}</SocketContext.Provider>;
};
