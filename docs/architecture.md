# Architecture

## Overview

FinVerse AI follows a microservices-inspired architecture with three primary application tiers:

```
Client (React + Vite)
        │
        ▼
  Backend API (Express/Node.js + TypeScript)
        │              │
        ▼              ▼
  PostgreSQL      Redis Cache
        │
        ▼
  AI Services (FastAPI / Python)
        │
        ▼
  OpenAI / External Market APIs
```

## Services

### Client — `client/`
- **React 18 + Vite** for fast development and optimised builds
- **Redux Toolkit** for global state (auth, portfolio, theme)
- **RTK Query** for server-state and data fetching
- **TanStack Query** for advanced cache management
- **Tailwind CSS** for utility-first styling with dark-mode support
- **Framer Motion** for animations
- **i18next** for English / Hindi localisation
- **Recharts** for data visualisation

### Backend API — `server/`
- **Express 4** with TypeScript
- **Prisma ORM** with PostgreSQL
- **JWT** (access + refresh token strategy)
- **Redis** (ioredis) for caching and session management
- **Winston** structured logging
- **express-validator** request validation
- **express-rate-limit** per-route throttling

### AI Services — `ai-services/`
- **FastAPI** async Python microservice
- **OpenAI GPT-4o-mini** for natural-language financial advisory
- **scikit-learn** for price forecasting (linear regression)
- Rule-based **sentiment analysis** on market news
- Monte Carlo **portfolio optimisation**

### Data Stores
- **PostgreSQL 15** — users, portfolios, holdings, transactions
- **Redis 7** — token blacklisting, AI response caching, rate-limit counters

## Data Flow

```
User ──► React UI ──► RTK Query ──► Express API ──► Prisma ──► PostgreSQL
                                           │
                                           ▼
                                    AI Services ──► OpenAI
                                           │
                                           ▼
                                        Redis
```

## Security

- HTTPS enforced in production (Nginx/Traefik TLS termination)
- JWT access tokens (15 min expiry) + refresh tokens (7 days, stored in DB)
- bcrypt password hashing (cost factor 12)
- Helmet HTTP security headers
- CORS restricted to `CLIENT_URL`
- Per-route rate limiting on AI endpoints
