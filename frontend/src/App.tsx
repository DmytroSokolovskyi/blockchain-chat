import {Navigate, Route, Routes} from "react-router-dom";
import {IAuthContext} from "./utils/types.ts";
import {useAuthContext} from "./providers/AuthContext.tsx";
import {Toaster} from "react-hot-toast";
import Login from "./pages/login/Login.tsx";
import Home from "./pages/home/Home.tsx";

function App() {
    const {authUser}: IAuthContext = useAuthContext();

    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
                <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
                <Route path='/login' element={authUser ? <Navigate to='/'/> : <Login/>}/>
            </Routes>
            <Toaster/>
        </div>
    );
}

export default App
