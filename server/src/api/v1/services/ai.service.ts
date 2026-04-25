import axios from "axios";
import { env } from "../../../config/env";
import { redis } from "../../../config/redis";

interface AdvisorParams {
  userId: string;
  message: string;
  sessionId?: string;
  portfolioId?: string;
}

export async function askAdvisor({ userId, message, sessionId, portfolioId }: AdvisorParams) {
  const response = await axios.post(
    `${env.AI_SERVICE_URL}/api/v1/advisor`,
    { user_id: userId, message, session_id: sessionId, portfolio_id: portfolioId },
    { headers: { "X-API-Key": env.AI_SERVICE_API_KEY } }
  );
  return response.data as { reply: string; sessionId: string };
}

export async function getInsights(portfolioId: string, userId: string) {
  const cacheKey = `insights:${userId}:${portfolioId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached) as unknown[];

  const response = await axios.get(
    `${env.AI_SERVICE_URL}/api/v1/portfolio/${portfolioId}/insights`,
    { headers: { "X-API-Key": env.AI_SERVICE_API_KEY } }
  );

  await redis.setex(cacheKey, 300, JSON.stringify(response.data));
  return response.data as unknown[];
}

export async function getChatHistory(sessionId: string, userId: string) {
  const cacheKey = `chat:${userId}:${sessionId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached) as unknown[];
  return [];
}

export async function getSentiment(symbol: string) {
  const cacheKey = `sentiment:${symbol}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached) as unknown;

  const response = await axios.get(
    `${env.AI_SERVICE_URL}/api/v1/sentiment/${symbol}`,
    { headers: { "X-API-Key": env.AI_SERVICE_API_KEY } }
  );

  await redis.setex(cacheKey, 600, JSON.stringify(response.data));
  return response.data as unknown;
}
