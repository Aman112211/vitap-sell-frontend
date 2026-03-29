# VITap Sell — Frontend

> ⚠️ **Work in Progress** — This project is still actively being developed. Features and APIs may change.

A React-based frontend for the **VITap Sell** campus marketplace — a peer-to-peer platform built exclusively for VIT-AP University students to buy and sell textbooks, electronics, notes, clothing, and more within the campus community.

---

## Related Repository

| Part | Repo | Stack |
|------|------|-------|
| **Frontend** (this repo) | [vitap-sell-frontend](https://github.com/Aman112211/vitap-sell-frontend) | React + Vite |
| **Backend** | [vitap-sell-backendapi](https://github.com/Aman112211/vitap-sell-backendapi) | Spring Boot + PostgreSQL |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Library | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router DOM 6 |
| Styling | CSS Modules + CSS Variables |
| Fonts | Syne (headings), DM Sans (body) — via Google Fonts |

---

## Features

- **Authentication** — Register and log in with campus email (`vitap.ac.in`)
- **User types** — Sign up as a buyer, seller, or both
- **Marketplace feed** — Browse all active listings on the homepage
- **Search & filter** — Filter by category (Books, Electronics, Notes, Clothing, Furniture, Other) and condition (Like New, Good, Fair, Used)
- **Sorting** — Sort by newest, price (low → high / high → low), or best rated
- **Save listings** — Toggle wishlist/save on any listing
- **Protected routes** — Authenticated-only access to the main marketplace
- **Zero commission** — Student-to-student direct transactions

---

## Project Structure

```
src/
├── api/
│   └── auth.js             # API calls for login and registration
├── components/
│   ├── Navbar.jsx           # Top navigation with category filters
│   └── ListingCard.jsx      # Individual product listing card
├── context/
│   └── AuthContext.jsx      # Global auth state (localStorage backed)
├── pages/
│   ├── LoginPage.jsx        # Login form
│   ├── RegisterPage.jsx     # Registration form
│   └── HomePage.jsx         # Main marketplace page
├── App.jsx                  # Route definitions
├── main.jsx                 # React entry point
└── index.css                # Global CSS variables and resets
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- The [backend API](https://github.com/Aman112211/vitap-sell-backendapi) running locally on `http://localhost:8080`

### Installation

```bash
# Clone the repo
git clone https://github.com/Aman112211/vitap-sell-frontend.git
cd vitap-sell-frontend

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`. API requests to `/users/*` are automatically proxied to `http://localhost:8080` (configured in `vite.config.js`).

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## API Integration

The frontend communicates with the backend via a Vite proxy. Ensure the backend is running before starting the dev server.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/register` | Register a new user |
| `POST` | `/users/login` | Log in with email and password |

See the [backend repository](https://github.com/Aman112211/vitap-sell-backendapi) for full API documentation and setup instructions.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
