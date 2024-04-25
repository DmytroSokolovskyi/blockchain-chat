import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		chatId: {
			type: String,
			required: true,
			unique: true,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
