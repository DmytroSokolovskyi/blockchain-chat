import {useEffect, useRef} from "react";
import {useSocket} from "../../hooks/useSocket.ts";
import Message from "./Message.tsx";

const Messages = () => {
    const {data}: any = useSocket("updatedChat");

    const lastMessageRef = useRef<HTMLDivElement | undefined>();

    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({behavior: "smooth"});
            }
        }, 100);
    }, [data]);

    return (
        <div className='px-4 flex-1 overflow-auto mt-1'>
            {data?.messages?.length > 0 &&
                data?.messages?.map((message: any) => (
                    <div key={message?._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
            {data?.messages?.length === 0 && (
                <p className='text-center'>Send a message to start</p>
            )}
        </div>
    );
};
export default Messages;
