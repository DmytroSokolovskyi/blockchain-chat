import {useEffect, useState} from "react";
import {useSocketContext} from "../providers/SocketContext.tsx";

export const useSocket = (query: string) => {
    const [data, setData] = useState([]);
    const {socket, user} = useSocketContext();
    const connect = () => {

        if (socket) {
            socket.on(query , (data?: any): void => {
                setData(data)
            });
        }
    }

    useEffect(() => {
        connect();
    }, [socket])

    return {data, user};
};
