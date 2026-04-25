import { Request, Response, NextFunction } from "express";
import * as transactionService from "../services/transaction.service";

export async function getTransactions(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const result = await transactionService.getTransactions(req.user!.id, { page, pageSize });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const tx = await transactionService.getTransactionById(req.params.id, req.user!.id);
    res.json(tx);
  } catch (error) {
    next(error);
  }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const tx = await transactionService.createTransaction(req.user!.id, req.body);
    res.status(201).json(tx);
  } catch (error) {
    next(error);
  }
}

export async function updateTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const tx = await transactionService.updateTransaction(
      req.params.id,
      req.user!.id,
      req.body
    );
    res.json(tx);
  } catch (error) {
    next(error);
  }
}

export async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    await transactionService.deleteTransaction(req.params.id, req.user!.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
