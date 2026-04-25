# API Reference

Base URL: `http://localhost:5000/api/v1`

All protected routes require: `Authorization: Bearer <accessToken>`

---

## Auth

### POST /auth/register
Register a new user.

**Body**
```json
{ "name": "Alice", "email": "alice@example.com", "password": "Secret123" }
```

**Response 201**
```json
{ "user": { "id": "...", "name": "Alice", "email": "alice@example.com", "role": "user" }, "accessToken": "...", "refreshToken": "..." }
```

---

### POST /auth/login
**Body** `{ "email": "...", "password": "..." }`  
**Response 200** — same shape as register.

---

### POST /auth/refresh
**Body** `{ "refreshToken": "..." }`  
**Response 200** `{ "accessToken": "..." }`

---

### POST /auth/logout *(protected)*
Invalidates all refresh tokens for the user.

---

### GET /auth/me *(protected)*
Returns the current user.

---

## Portfolios *(all protected)*

| Method | Path | Description |
|--------|------|-------------|
| GET | `/portfolios` | List user's portfolios |
| POST | `/portfolios` | Create portfolio |
| GET | `/portfolios/:id` | Get portfolio |
| PUT | `/portfolios/:id` | Update portfolio |
| DELETE | `/portfolios/:id` | Delete portfolio |
| GET | `/portfolios/:id/holdings` | List holdings |
| POST | `/portfolios/:id/holdings` | Add holding |

---

## Transactions *(all protected)*

| Method | Path | Description |
|--------|------|-------------|
| GET | `/transactions` | List transactions (paginated) |
| POST | `/transactions` | Create transaction |
| GET | `/transactions/:id` | Get transaction |
| PUT | `/transactions/:id` | Update transaction |
| DELETE | `/transactions/:id` | Delete transaction |

---

## AI *(all protected)*

### POST /ai/advisor
**Body** `{ "message": "Should I buy NVDA?", "portfolioId": "..." }`  
**Response** `{ "reply": "...", "sessionId": "..." }`

### GET /ai/insights/:portfolioId
Returns AI-generated insights for a portfolio.

### GET /ai/sentiment/:symbol
Returns sentiment score for a ticker symbol.

---

## AI Services (Port 8000)

### POST /api/v1/advisor
### GET /api/v1/portfolio/:id/insights
### GET /api/v1/sentiment/:symbol
### POST /api/v1/forecast

See FastAPI auto-docs at http://localhost:8000/docs
