import React, { createContext, useContext, useState } from "react";
import {IAuthContext, IUser} from "../utils/types.js";

const initialUser: IUser | null = JSON.parse(localStorage.getItem("chat-user") || "null");

export const AuthContext = createContext<IAuthContext>({
    authUser: initialUser,
    setAuthUser: () => {
    }
});

export const useAuthContext = (): IAuthContext => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [authUser, setAuthUser] = useState<IUser | null>(initialUser);

    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>;
};
