ROOT LEVEL

local-hands/
backend/
web-app/
mobile-app/
shared/
docs/
docker/
README.md
.env.example

This is the main project container.

backend/ → The brain (API + logic)
web-app/ → Browser interface
mobile-app/ → Android app
shared/ → Shared API definitions and types
docs/ → Planning and team coordination
docker/ → Container setup for running everything

README.md → Explains the whole system
.env.example → Shows required environment variables

BACKEND STRUCTURE (FastAPI)

backend/
app/
main.py
core/
services/
models/
schemas/
db/
api/
requirements.txt
Dockerfile
README.md

Now let’s break that down.

main.py

This is the entry point of the backend.

It:

Creates the FastAPI app

Registers routes

Starts the server

Connects middleware (CORS, auth, etc.)

Think of this as the engine starter.

core/config.py

Handles environment variables like:

Database URL

Secret keys

JWT settings

This keeps sensitive settings out of the code.

core/security.py

Contains:

JWT token creation

Token validation

Password hashing logic

This ensures secure authentication.

services/

This is where microservices logic lives.

Inside services/ you’ll see folders like:

auth/
profile/
jobs/
matching/
analytics/

Each service has:

routes.py
service.py
models.py
schemas.py

Let’s explain those.

routes.py

Defines API endpoints.

Example:
POST /auth/login
POST /profiles/
GET /matches/{job_id}

This file tells FastAPI:
“When someone hits this URL, call this function.”

service.py

Contains the business logic.

Example:

In matching/service.py:
You’ll see the function that calculates match scores.

This keeps logic separate from routes.

models.py

Defines database models.

Example:

class User(Base):
id
name
role

These map directly to database tables.

schemas.py

Defines request and response validation using Pydantic.

Example:

class ProfileCreate(BaseModel):
description: str

This ensures incoming data is clean and structured.

db/

session.py

Creates the database connection.

base.py

Defines Base = declarative_base()

Used by SQLAlchemy to create models.

This layer connects the backend to Huawei RDS.

api/routes/

This collects all route files and registers them in main.py.

Instead of dumping all routes in one place, it organizes them by service.

Clean and scalable.

WEB APP STRUCTURE (Next.js)

web-app/
src/
app/
components/
services/
contexts/
hooks/
types/

app/

Contains pages and layout structure (Next.js App Router).

Example:
login/page.tsx
dashboard/page.tsx

components/

Reusable UI components.

Example:
Button.tsx
JobCard.tsx
ProfileForm.tsx

services/

This is important.

Contains API logic.

Example:
api.ts → Axios instance
authService.ts
jobService.ts

This is how web talks to backend.

contexts/

Handles global state like authentication.

Example:
AuthContext.tsx

This keeps user logged in across pages.

hooks/

Custom React hooks.

Example:
useAuth.ts
useFetchJobs.ts

types/

TypeScript definitions for:

User
Job
Match

These mirror backend schemas.

MOBILE APP STRUCTURE (React Native)

mobile-app/
src/
screens/
components/
services/
contexts/
hooks/
types/

screens/

Full pages:

LoginScreen.tsx
ProfileScreen.tsx
JobListScreen.tsx
MatchScreen.tsx

components/

Reusable UI pieces:

CustomButton.tsx
InputField.tsx

services/

Same as web — contains API calls.

Very important:
Both mobile and web use the same API structure.

contexts/

Handles auth state.

hooks/

Reusable logic.

types/

Shared models (mirrors backend).

The mobile app connects to the exact same backend endpoints.

That’s how they stay synced.

SHARED FOLDER

shared/
api-contract/
types/

api-contract/openapi.yaml

This defines the official API structure.

It ensures:

Web devs

Mobile devs

Backend devs

All agree on request and response shapes.

types/

Defines shared data models in TypeScript.

Example:

User type
Job type
Match type

This prevents inconsistencies between platforms.

DOCKER

docker/docker-compose.yml

Defines services:

backend
postgres
redis

This allows the entire system to run locally with:

docker-compose up

Dockerfile (inside backend)

Defines:

Python version

Install requirements

Copy app files

Run server

This makes deployment to Huawei Cloud clean.

HOW EVERYTHING CONNECTS

Worker (Mobile App)
↓
API call → Backend route
↓
Service logic executes
↓
Database updated
↓
Optional AI call
↓
Response returned

Employer (Web App)
↓
Same backend
↓
Same database
↓
Matching engine runs
↓
Ranked candidates returned

Everything is centralized in backend.
Frontend layers are just interfaces.

WHY THIS STRUCTURE IS STRONG

Clean separation of concerns

Scalable microservices

Shared API contract

Dockerized for deployment

Cloud-ready

Mobile and web fully synchronized
