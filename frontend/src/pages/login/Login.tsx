import React, {useState, FormEvent, useEffect} from "react";
import InputDropdown from "../../components/UI/InputDropdown.tsx";
import {axiosInstance} from "../../providers/SocketContext.tsx";
import useLogin from "../../hooks/useLogin.ts";
import {IChat} from "../../utils/types.ts";

const INITIAL_LOGIN_OBJ = {
    username: "",
    chatId: 0,
};
const Login: React.FC = () => {
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const [errorMessage, setErrorMessage] = useState("");
    const [chats, setChats] = useState<number[]>([]);
    const {loading, login} = useLogin();
    const getAllChats = async () => {
        const response = await axiosInstance.get("/api/chats", {});
        return response.data.map((chat: IChat) => chat.chatId);
    };

    useEffect(() => {
        getAllChats().then((chats) => setChats(chats));
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (errorMessage || !loginObj.username || !loginObj.chatId) {
            return
        }
        await login(loginObj);
    };

    const updateFormValue = (updateType: string, value: string | number) => {
        setErrorMessage("");

        if (updateType === "username" && value.toString().length <= 6) {
            setErrorMessage("Username should be more than length 6");
        }
        if (updateType === "chatId" && value.toString().length !== 8) {
            setErrorMessage("Chat id should be of length 8");
        }

        setLoginObj({...loginObj, [updateType]: value});
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto text-black'>
            <div
                className='w-full p-6 rounded-lg shadow-md bg-gray-light'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Blockchain Chat
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10  bg-white'
                            value={loginObj.username}
                            onChange={(e) => updateFormValue("username", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black '>Chat Id</span>
                        </label>
                        <InputDropdown
                            placeholder="Enter chat id"
                            options={chats}
                            updateFormValue={(value: number) => updateFormValue("chatId", value)}
                        />
                    </div>
                    <div>
                        <button className='btn btn-block btn-sm mt-6 h-10' disabled={loading}>
                            {loading ? <span className='loading loading-spinner '></span> : "Login"}
                        </button>
                    </div>
                    <div className="text-center  text-error mt-2">{errorMessage}</div>
                </form>
            </div>
        </div>
    );
};

export default Login;

