import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authController from "../controllers/auth.controller.js";
import chatMiddleware from "../middleware/chatMiddleware.js";
const router = express.Router();

router.post("/login",
    authMiddleware.checkToken,
    authMiddleware.checkUser,
    chatMiddleware.checkChat,
    authController.login
);

router.get("/logout",
    authMiddleware.checkToken,
    authController.logout
);

export default router;
