import React from "react";
import * as SocketIOClient from 'socket.io-client';

export interface IUser {
	username: string;
	profilePic: string;
    chatId?: number;
	_id: string;
}
export interface IAuthContext {
  authUser: IUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export interface ISocketContext {
    socket: SocketIOClient.Socket | null;
    user: IUser;
}

export interface IChat {
  chatId: number;
  createdAt: string;
  messages: any[];
  updatedAt: string;
  users: string[];
}


