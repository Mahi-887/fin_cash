import rateLimit from "express-rate-limit";

export function rateLimiter(maxRequests: number, windowSeconds: number) {
  return rateLimit({
    windowMs: windowSeconds * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: { message: "Too many requests, please try again later.", status: 429 } },
  });
}

export const globalRateLimiter = rateLimiter(100, 60);
