// import MessageInput from "./MessageInput";
import Messages from "./Messages.tsx";
import MessageInput from "./MessageInput.tsx";
import {useSocketContext} from "../../providers/SocketContext.tsx";

const MessageContainer: React.FC = () => {
    const {socket} = useSocketContext();

    if (socket) {
        socket.emit('getMessages');
    }

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            <Messages/>
            <MessageInput/>
        </div>
    );
};
export default MessageContainer;

