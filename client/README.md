# Hiwaga Makers — Client

The marketing website + admin dashboard for **Hiwaga Makers**, a digital marketing agency.
Built as a single-page React app with Vite, Tailwind, and shadcn/ui.

> **This is the front-end repo.** The API server lives in a separate repository.

---

## Tech

| Layer       | What we use                                          |
| ----------- | ---------------------------------------------------- |
| Bundler     | Vite 8 (React plugin)                                |
| UI          | React 18 + React Router 6                            |
| Styling     | Tailwind CSS 3, shadcn/ui (neutral base, JSX)        |
| Type system | Plain JavaScript (jsconfig path aliases for `@/`)    |
| Forms       | React Hook Form + Zod                                |
| Icons       | lucide-react                                         |
| HTTP        | Axios (instance in `src/lib/api.js`)                 |
| Fonts       | Geist + Fraunces (Google Fonts)                      |
| Linting     | ESLint + Prettier                                    |

---

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env if your API isn't on http://localhost:5000

# 3. Dev server (http://localhost:7040)
npm run dev
```

### Scripts

| Command            | Does                                  |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Vite dev server (HMR, port 7040)      |
| `npm run build`    | Production build → `dist/`            |
| `npm run preview`  | Preview the production build locally  |
| `npm run lint`     | ESLint                                |
| `npm run format`   | Prettier write                        |
| `npm run format:check` | Prettier check (CI-friendly)      |

---

## Folder structure

```
src/
├── assets/                   Images, fonts, team photos, brand logos
├── components/
│   ├── admin/                Admin shell (Sidebar, AdminLayout)
│   ├── layout/               Site Navbar + Footer
│   ├── sections/             Home page sections
│   ├── ui/                   shadcn/ui components
│   ├── HomeIntro.jsx         First-load splash for the home page
│   └── Reveal.jsx            Scroll-reveal wrapper (IntersectionObserver)
├── data/
│   └── blogPosts.js          Mock blog data (swap for API later)
├── hooks/
├── lib/
│   ├── api.js                Axios instance, baseURL = VITE_API_URL or /api
│   └── utils.js              `cn()` Tailwind class merger
├── pages/
│   ├── Home.jsx, About.jsx, Works.jsx, Services.jsx,
│   ├── Team.jsx, Careers.jsx, Contact.jsx, FAQ.jsx,
│   ├── Blog.jsx, BlogDetail.jsx
│   └── admin/                Admin pages (Login, Dashboard, Works, Blogs,
│                              Careers, DOOH)
├── App.jsx                   Routes
├── main.jsx                  Entry
└── index.css                 Tailwind + global tokens + keyframes
```

---

## Connecting to the API

`src/lib/api.js` exports a configured Axios instance:

```js
import api from '@/lib/api'

const { data } = await api.get('/health')
```

Base URL resolves from `VITE_API_URL` (set in `.env`) and falls back to `/api`.
In development, `vite.config.js` proxies `/api/*` to `http://localhost:5000`,
so the client can hit the server with no CORS configuration.

---

## Admin section

The admin lives under `/admin/*`:

| Route                | Page                                         |
| -------------------- | -------------------------------------------- |
| `/admin/login`       | UI-only login (any email/password works)     |
| `/admin`             | Dashboard overview                           |
| `/admin/works`       | Manage Instagram reels for the Works page    |
| `/admin/blogs`       | Full blog post editor with content blocks    |
| `/admin/careers`     | Review applications (status workflow)        |
| `/admin/dooh`        | DOOH revenue + venue-share tracker           |

Auth is `sessionStorage`-based and UI-only for now. Wire to real auth + API
when the server is ready.

---

## shadcn/ui

Configured for **JSX + neutral base**. Add components with:

```bash
npx shadcn@latest add button card input form dialog
```

They land in `src/components/ui/`. Theme tokens live as CSS variables in
`src/index.css` (`:root` light + `.dark` dark).

---

## Deployment notes

- The build output is a static SPA in `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront).
- For SPA routing to work, configure a catch-all rewrite to `/index.html`.
- Set `VITE_API_URL` to the production API origin at build time.
