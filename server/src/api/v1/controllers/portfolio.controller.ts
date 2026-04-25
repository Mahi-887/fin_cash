import { Request, Response, NextFunction } from "express";
import * as portfolioService from "../services/portfolio.service";

export async function getPortfolios(req: Request, res: Response, next: NextFunction) {
  try {
    const portfolios = await portfolioService.getPortfoliosByUser(req.user!.id);
    res.json(portfolios);
  } catch (error) {
    next(error);
  }
}

export async function getPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const portfolio = await portfolioService.getPortfolioById(req.params.id, req.user!.id);
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
}

export async function createPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const portfolio = await portfolioService.createPortfolio(req.user!.id, req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    next(error);
  }
}

export async function updatePortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const portfolio = await portfolioService.updatePortfolio(
      req.params.id,
      req.user!.id,
      req.body
    );
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
}

export async function deletePortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    await portfolioService.deletePortfolio(req.params.id, req.user!.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getHoldings(req: Request, res: Response, next: NextFunction) {
  try {
    const holdings = await portfolioService.getHoldings(req.params.id, req.user!.id);
    res.json(holdings);
  } catch (error) {
    next(error);
  }
}

export async function addHolding(req: Request, res: Response, next: NextFunction) {
  try {
    const holding = await portfolioService.addHolding(req.params.id, req.user!.id, req.body);
    res.status(201).json(holding);
  } catch (error) {
    next(error);
  }
}
