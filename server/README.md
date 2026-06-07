# Hiwaga Makers — Server

The API backend for **Hiwaga Makers**, a digital marketing agency.
Node.js + Express + MongoDB.

> **This is the back-end repo.** The marketing site + admin dashboard live
> in a separate front-end repository.

---

## Tech

| Layer        | What we use                            |
| ------------ | -------------------------------------- |
| Runtime      | Node.js 20+                            |
| Framework    | Express 5                              |
| Database     | MongoDB via Mongoose                   |
| Middleware   | cors, helmet, morgan                   |
| Config       | dotenv                                 |
| Dev tooling  | nodemon, ESLint, Prettier              |

---

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env — set MONGO_URI and CORS_ORIGIN

# 3. Dev server (http://localhost:5000)
npm run dev
```

### Scripts

| Command                | Does                                      |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Nodemon hot-reload                        |
| `npm run start`        | Production start                          |
| `npm run lint`         | ESLint                                    |
| `npm run format`       | Prettier write                            |
| `npm run format:check` | Prettier check                            |

---

## Environment variables

| Key             | Default                                   | Notes                              |
| --------------- | ----------------------------------------- | ---------------------------------- |
| `PORT`          | `5000`                                    | HTTP port                          |
| `NODE_ENV`      | `development`                             | `development` / `production`       |
| `MONGO_URI`     | `mongodb://127.0.0.1:27017/hiwaga`        | MongoDB connection string          |
| `CORS_ORIGIN`   | `http://localhost:5173`                   | Front-end origin allowed by CORS   |

Full template lives in `.env.example`. Never commit `.env`.

---

## Folder structure

```
src/
├── config/
│   ├── env.js           Loads + validates env vars
│   └── db.js            Mongoose connect
├── controllers/         Route handlers (one file per resource)
├── models/              Mongoose schemas
├── routes/
│   ├── health.js        GET /api/health
│   └── index.js         Mounts every resource router under /api
├── middleware/
│   └── errorHandler.js  404 + global error handlers
└── utils/
server.js                App entry — wires middleware, routes, listens
```

---

## API surface

Currently exposed:

| Method | Path           | Description                |
| ------ | -------------- | -------------------------- |
| GET    | `/api/health`  | Liveness check, returns `{ status, uptime, timestamp, db }` |

Add new resources by:
1. Creating a model in `src/models/`.
2. Adding a router in `src/routes/{resource}.js`.
3. Mounting it inside `src/routes/index.js` via `router.use('/{resource}', …)`.

---

## CORS

`server.js` reads `CORS_ORIGIN` and configures `cors()` accordingly.
For multiple origins, switch to an array or a function — see Express CORS docs.

---

## Deployment

- Any Node-compatible host (Render, Railway, Fly, EC2, App Engine, etc.)
- Set the env vars above on the platform.
- Use MongoDB Atlas (or any managed Mongo) for `MONGO_URI` in production.
- Reverse-proxy `/api/*` from your domain to this server if the front-end is on the same domain — otherwise just point `VITE_API_URL` directly at this server's URL.

---

## Pairing with the client

The front-end calls this server via an Axios instance that defaults to
`/api`. In development, the client's Vite dev server proxies `/api/*`
to `http://localhost:5000`, so both halves can run side-by-side with no
extra setup.
