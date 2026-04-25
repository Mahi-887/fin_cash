import "dotenv/config";

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  NODE_ENV: optional("NODE_ENV", "development") as "development" | "production" | "test",
  PORT: parseInt(optional("PORT", "5000"), 10),
  CLIENT_URL: optional("CLIENT_URL", "http://localhost:3000"),
  DATABASE_URL: required("DATABASE_URL"),
  REDIS_URL: optional("REDIS_URL", "redis://localhost:6379"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET"),
  JWT_EXPIRES_IN: optional("JWT_EXPIRES_IN", "15m"),
  JWT_REFRESH_EXPIRES_IN: optional("JWT_REFRESH_EXPIRES_IN", "7d"),
  AI_SERVICE_URL: optional("AI_SERVICE_URL", "http://localhost:8000"),
  AI_SERVICE_API_KEY: optional("AI_SERVICE_API_KEY", ""),
} as const;
