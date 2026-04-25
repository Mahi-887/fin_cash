import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

export const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/profile", userController.getProfile);
userRouter.put("/profile", userController.updateProfile);
userRouter.put("/password", userController.changePassword);
userRouter.delete("/account", userController.deleteAccount);
