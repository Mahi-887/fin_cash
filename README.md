# FinVerse AI — Enterprise AI-Powered Financial Platform

> A full-stack, production-ready financial platform that combines real-time portfolio management, AI-driven investment advisory, and multi-language support into a single, cohesive experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-green)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-teal)](https://fastapi.tiangolo.com/)

---

## Overview

FinVerse AI is an enterprise-grade financial platform built for individuals and institutions who want AI-powered insights alongside traditional portfolio management tools. It supports real-time market data, natural-language financial advisory, sentiment analysis, and price forecasting — all wrapped in a modern, accessible UI.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FinVerse AI                              │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   React+Vite │    │ Express/Node │    │  FastAPI Python  │  │
│  │   Frontend   │◄──►│   Backend    │◄──►│   AI Services    │  │
│  │   :3000      │    │   :5000      │    │   :8000          │  │
│  └──────────────┘    └──────┬───────┘    └──────────────────┘  │
│                             │                                   │
│                    ┌────────┴────────┐                          │
│                    │                 │                          │
│              ┌─────▼─────┐   ┌──────▼─────┐                   │
│              │ PostgreSQL │   │   Redis     │                   │
│              │  :5432     │   │   :6379     │                   │
│              └───────────┘   └────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Redux Toolkit, TanStack Query, Framer Motion, Recharts |
| **Backend** | Node.js, Express, TypeScript, Prisma ORM, JWT, Winston |
| **AI Services** | Python 3.11, FastAPI, LangChain, OpenAI, scikit-learn, pandas |
| **Database** | PostgreSQL 15 |
| **Cache / Queue** | Redis 7 |
| **Infrastructure** | Docker, Docker Compose |
| **Auth** | JWT (access + refresh tokens), bcrypt |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.11
- Docker & Docker Compose
- PostgreSQL 15 (if running locally without Docker)

### 1 — Clone & configure

```bash
git clone https://github.com/Mahi-887/fin_cash.git
cd fin_cash
cp .env.example .env          # fill in your secrets
cp client/.env.example client/.env
cp server/.env.example server/.env
cp ai-services/.env.example ai-services/.env
```

### 2 — Run with Docker (recommended)

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api/v1 |
| AI Services | http://localhost:8000/docs |

### 3 — Run locally (development)

**Frontend**
```bash
cd client
npm install
npm run dev
```

**Backend**
```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```

**AI Services**
```bash
cd ai-services
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## Project Structure

```
fin_cash/
├── client/          # React + Vite frontend
├── server/          # Express + TypeScript API
├── ai-services/     # FastAPI Python AI micro-service
├── docs/            # Architecture & API docs
├── docker-compose.yml
└── .env.example
```

---

## Contributing

See [docs/contributing.md](docs/contributing.md) for guidelines.

---

## License

MIT © FinVerse AI Contributors