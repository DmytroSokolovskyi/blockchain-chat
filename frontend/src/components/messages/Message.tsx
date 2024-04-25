import {useSocketContext} from "../../providers/SocketContext.tsx";

const Message = ({message}: { message: any; }) => {
    const {user} = useSocketContext();

    const fromMe = message.senderId === user?._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = user?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic}/>
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
        </div>
    );
};
export default Message;
