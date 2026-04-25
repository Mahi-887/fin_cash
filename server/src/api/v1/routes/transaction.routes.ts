import { Router } from "express";
import * as transactionController from "../controllers/transaction.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

export const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.get("/", transactionController.getTransactions);
transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.get("/:id", transactionController.getTransaction);
transactionRouter.put("/:id", transactionController.updateTransaction);
transactionRouter.delete("/:id", transactionController.deleteTransaction);
