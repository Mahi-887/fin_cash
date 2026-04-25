import { Router } from "express";
import * as portfolioController from "../controllers/portfolio.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

export const portfolioRouter = Router();

portfolioRouter.use(authMiddleware);

portfolioRouter.get("/", portfolioController.getPortfolios);
portfolioRouter.post("/", portfolioController.createPortfolio);
portfolioRouter.get("/:id", portfolioController.getPortfolio);
portfolioRouter.put("/:id", portfolioController.updatePortfolio);
portfolioRouter.delete("/:id", portfolioController.deletePortfolio);
portfolioRouter.get("/:id/holdings", portfolioController.getHoldings);
portfolioRouter.post("/:id/holdings", portfolioController.addHolding);
