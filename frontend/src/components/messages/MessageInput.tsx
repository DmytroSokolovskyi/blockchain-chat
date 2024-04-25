import {FormEvent, useState} from "react";
import {BsSend} from "react-icons/bs";
import {useSocketContext} from "../../providers/SocketContext.tsx";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const {socket, user} = useSocketContext();


    console.log("user", user)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!message) return;
        if (socket) {
            socket.emit('sendMessage', {message, chatId: user?.chatId, senderId: user?._id});
        }
        setMessage("");
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    <BsSend/>
                </button>
            </div>
        </form>
    );
};
export default MessageInput;

