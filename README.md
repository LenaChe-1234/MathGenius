# MathGenius

MathGenius is a web application prototype for helping children learn mathematics through three core learning flows:

- a school math topic library with theory and practice;
- personalized study plans with saved progress;
- a dedicated Gymi Kurz/Lang preparation area with diagnostics and mock exams.

The project currently includes both a frontend and a backend layer.

## Architecture Direction

The backend now follows a typed TypeScript structure under `src/` with shared domain models, typed stores, and provider-based database initialization. This makes the project safer to evolve as new features such as authentication, adaptive progress tracking, and reporting are added.

## Frontend Quick Start

The frontend is a static application with no build step required.

1. Open `index.html` directly in a browser.
2. Or start a simple local server from the project folder:

```bash
python3 -m http.server 8000
```

The app will then be available at `http://localhost:8000`.

## Backend API

The backend uses `Node.js`, `Express`, `TypeScript`, and supports `MongoDB`, `PostgreSQL`, or an in-memory demo mode.
It now includes a basic authentication service with account creation, login, protected learner routes, and separate activity/progress tracing.

### Backend files

- `src/server.ts` - backend entry point
- `src/app.ts` - Express app and API routes
- `src/types/domain.ts` - shared backend domain types
- `src/store/` - typed data store implementations
- `src/db/providers.ts` - database provider initialization
- `src/config/env.ts` - environment configuration
- `src/content/seed-content.ts` - typed seed content
- `backend/schema.sql` - PostgreSQL schema
- `backend/seed.sql` - PostgreSQL seed data
- `src/scripts/seed-mongo.ts` - MongoDB seed script

### Run the backend

1. Copy `.env.example` to `.env`.
2. Install dependencies:

```bash
npm install
```

3. For local startup without a database, keep:

```env
USE_IN_MEMORY_DATA=true
```

4. Choose a database provider in `.env`:

```env
DB_PROVIDER=memory
```

Available values:

- `memory`
- `postgres`
- `mongo`

5. To run with PostgreSQL, set:

```env
DB_PROVIDER=postgres
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mathginius
USE_IN_MEMORY_DATA=false
```

6. To run with MongoDB, set:

```env
DB_PROVIDER=mongo
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME=mathginius
USE_IN_MEMORY_DATA=false
```

7. Set a strong token secret for authentication:

```env
AUTH_TOKEN_SECRET=change-this-to-a-long-random-secret
AUTH_TOKEN_TTL_SECONDS=43200
```

8. Start the server:

```bash
npm run dev
```

The backend will be available at `http://localhost:3030`.

### TypeScript scripts

```bash
npm run dev
npm run check
npm run build
npm run start
```

### Main API endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/topics`
- `GET /api/topics/:slug`
- `GET /api/gymi/tracks`
- `GET /api/gymi/mock-exams`
- `GET /api/me/plan`
- `POST /api/me/plan`
- `GET /api/me/progress`
- `POST /api/me/progress`
- `GET /api/me/activity`

Protected routes use `Authorization: Bearer <token>`.

### Security Notes

- passwords are stored only as salted password hashes, never in plain text
- account responses do not expose password hashes or token secrets
- authenticated routes use signed expiring bearer tokens
- learner input is sanitized and length-limited before storage
- activity tracing is stored separately from learning progress for better auditing and clearer data ownership

### Initialize PostgreSQL

After creating your database, run:

```bash
psql "$DATABASE_URL" -f backend/schema.sql
psql "$DATABASE_URL" -f backend/seed.sql
```

### Initialize MongoDB

After setting `MONGODB_URL` and `MONGODB_DB_NAME`, run:

```bash
npm run seed:mongo
```

## What Is Implemented

- responsive landing page and section navigation
- school topic catalog with filters
- theory blocks and three difficulty levels of practice tasks
- personalized study plan builder
- local persistence for plans and completed topics through `localStorage`
- backend API for plans and progress
- auth service for secure individual accounts
- separate activity tracing and progress tracking
- PostgreSQL schema for future scaling
- TypeScript backend with typed domain models and store contracts
- Gymi preparation section with separate Kurz/Lang tracks and mock exams

## Current MVP Limitations

- Gymi tasks are still demo content styled after the preparation format
- roles such as parent, teacher, and admin are not implemented yet
- the frontend still uses local persistence for some flows and is not fully migrated to backend-backed user state
- the content database is still a starter set and can be expanded through `app.js` and `src/content/seed-content.ts`

## Should This Project Use Angular?

Not yet.

Angular would make sense later if the project grows into a large enterprise-style application with multiple dashboards, a bigger team, strict UI architecture rules, and long-lived forms-heavy workflows. Right now the product is still validating core learning flows, and Angular would add extra framework weight before the domain model and UX are stable.

For this stage, the better move is:

- keep the current frontend lean while stabilizing the backend and data model
- continue introducing TypeScript and shared interfaces
- only adopt a full frontend framework once the app needs component complexity, authenticated flows, and larger state management

If the frontend is rewritten later, a lighter TypeScript-first stack such as `Vite + React` would likely fit this product phase better than Angular.
