import { Router } from "express";
import * as aiController from "../controllers/ai.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { rateLimiter } from "../../../middleware/rateLimiter";

export const aiRouter = Router();

aiRouter.use(authMiddleware);

aiRouter.post("/advisor", rateLimiter(20, 60), aiController.askAdvisor);
aiRouter.get("/insights/:portfolioId", aiController.getInsights);
aiRouter.get("/chat/:sessionId", aiController.getChatHistory);
aiRouter.get("/sentiment/:symbol", aiController.getSentiment);
