import React from "react";
import {useSocket} from "../../hooks/useSocket.ts";
import {IChat} from "../../utils/types.ts";
import {axiosInstance, useSocketContext} from "../../providers/SocketContext.tsx";
import {useAuthContext} from "../../providers/AuthContext.tsx";

const Sidebar: React.FC = () => {
    const {data} = useSocket("updatedChats");
    const {socket} = useSocketContext();
    const {authUser} = useAuthContext();

    const selectChat = (chatId: number) => {
        if (socket) {
            socket.emit('updateChatId', {chatId: chatId});
        }
    };

    const logout = async () => {
        await axiosInstance.get("/api/auth/logout");
        localStorage.removeItem("chat-user");
        window.location.reload();
    };

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col justify-between'>
            <div className='py-2 flex flex-col overflow-auto'>
                {data && authUser && data.filter((one: IChat) => one.users.includes(authUser._id))?.map((chat: IChat) => (
                    <div
                        key={chat.chatId}
                        className={`flex gap-2 m-1 items-center hover:bg-gray-light rounded p-2 py-1 cursor-pointer bg-gray-dark ${authUser?.chatId === chat.chatId ? "bg-white" : ""}`}
                        onClick={() => selectChat(chat.chatId)}
                    >
                        <div className='flex flex-col flex-1'>
                            <div className='flex gap-3 justify-between'>
                                <p className='font-bold text-gray-200'>{chat.chatId}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='divider px-3'></div>
            <button className='btn btn-block btn-sm mt-6 h-10 bg-gray-dark'
                    onClick={logout}
            >
                Logout
            </button>
        </div>
    );
};
export default Sidebar;
