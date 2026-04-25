import { Request, Response, NextFunction } from "express";
import * as aiService from "../services/ai.service";

export async function askAdvisor(req: Request, res: Response, next: NextFunction) {
  try {
    const { message, sessionId, portfolioId } = req.body as {
      message: string;
      sessionId?: string;
      portfolioId?: string;
    };
    const result = await aiService.askAdvisor({ userId: req.user!.id, message, sessionId, portfolioId });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getInsights(req: Request, res: Response, next: NextFunction) {
  try {
    const insights = await aiService.getInsights(req.params.portfolioId, req.user!.id);
    res.json(insights);
  } catch (error) {
    next(error);
  }
}

export async function getChatHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await aiService.getChatHistory(req.params.sessionId, req.user!.id);
    res.json(messages);
  } catch (error) {
    next(error);
  }
}

export async function getSentiment(req: Request, res: Response, next: NextFunction) {
  try {
    const sentiment = await aiService.getSentiment(req.params.symbol);
    res.json(sentiment);
  } catch (error) {
    next(error);
  }
}
