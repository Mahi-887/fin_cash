# Deployment

## Docker (recommended)

```bash
cp .env.example .env   # fill in all secrets
docker compose up --build -d
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- AI Services: http://localhost:8000

## Production Checklist

- [ ] Replace all `change_me` secrets in `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Set a real `OPENAI_API_KEY`
- [ ] Configure a domain and TLS certificate (Nginx / Traefik)
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Set up automated backups for PostgreSQL
- [ ] Enable Redis persistence (`appendonly yes` in `redis.conf`)

## Environment Variables

See `.env.example` at the repository root for all required variables.

## Database Migrations

```bash
cd server
npx prisma migrate deploy   # production
npx prisma migrate dev      # development (also runs seed)
npx prisma studio           # visual DB browser
```

## Scaling

- The `server` and `ai-services` containers are stateless and can be horizontally scaled behind a load balancer.
- Redis is used for shared state (token cache, rate limits).
- PostgreSQL connection pooling is handled by Prisma's built-in pool.
