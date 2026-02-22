# Local Hands 2.0

Cloud-native monorepo skeleton for:
- Web Application (`React + Next.js + TypeScript`)
- Mobile Application (`React Native + Expo`)
- Backend API (`Python + FastAPI`, microservices style)
- Shared API contracts
- Dockerized services

## Repository Layout

```text
local-hands/
  backend/
  web-app/
  mobile-app/
  shared/
  docs/
  docker/
  .env.example
  README.md
```

## Team Split

- Mobile Team (2 devs): `mobile-app/`
- Web Team (2 devs): `web-app/`
- Shared Responsibility: `backend/`, `shared/`, `docker/`, `docs/`

## Quick Start

1. Copy environment variables:
   - `cp .env.example .env`
2. Start stack:
   - `docker compose -f docker/docker-compose.yml up --build`
3. Backend health check:
   - `http://localhost:8000/health`

## API Sync Strategy

- Contract-first approach with `shared/contracts/openapi.yaml`
- Web and Mobile clients consume shared API definitions
- Backend routes must remain aligned with `shared/contracts/`
