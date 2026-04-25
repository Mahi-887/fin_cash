import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validateRequest } from "../../../middleware/validate";
import { loginValidator, registerValidator } from "../validators/auth.validator";
import { authMiddleware } from "../../../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", registerValidator, validateRequest, authController.register);
authRouter.post("/login", loginValidator, validateRequest, authController.login);
authRouter.post("/refresh", authController.refreshToken);
authRouter.post("/logout", authMiddleware, authController.logout);
authRouter.get("/me", authMiddleware, authController.getMe);
