import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import chatController from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/",
    authMiddleware.checkToken,
    chatController.getAllChats
);
router.get("/user",
    authMiddleware.checkToken,
    chatController.getUserChats
);

export default router;

