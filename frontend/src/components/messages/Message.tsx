import {useAuthContext} from "../../providers/AuthContext.tsx";

const Message = ({message}: { message: any; }) => {
    const {authUser} = useAuthContext();

    const fromMe = message.senderId === authUser?._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = authUser?.profilePic;
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
