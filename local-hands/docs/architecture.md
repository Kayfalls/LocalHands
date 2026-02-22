# Local Hands 2.0 Architecture

## High-Level

- Frontends:
  - Web: Next.js app (`web-app/`)
  - Mobile: Expo app (`mobile-app/`)
- Backend:
  - FastAPI microservices-style modules (`backend/app/services/*`)
- Shared contracts:
  - OpenAPI and cross-platform types (`shared/`)

## Team Collaboration Model

- Mobile developers own `mobile-app/`
- Web developers own `web-app/`
- Backend and contracts are shared ownership
- API-first workflow enforced through `shared/contracts/openapi.yaml`
