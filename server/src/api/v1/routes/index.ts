import { Router } from "express";
import { authRouter } from "./auth.routes";
import { portfolioRouter } from "./portfolio.routes";
import { transactionRouter } from "./transaction.routes";
import { aiRouter } from "./ai.routes";
import { userRouter } from "./user.routes";

export const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/portfolios", portfolioRouter);
v1Router.use("/transactions", transactionRouter);
v1Router.use("/ai", aiRouter);
v1Router.use("/users", userRouter);
