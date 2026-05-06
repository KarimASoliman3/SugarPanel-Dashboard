# Sugarpanel — Frontend Internship Project

A responsive React dashboard application matching the Sugarpanel Figma design, featuring analytics, product management, and user management.

---

## 🚀 Live Demo

> [Deploy to Vercel/Netlify and add your URL here](https://sugar-panel-dashboard.vercel.app).

---

## 🛠 Tech Stack

- **React 18** — Functional components, hooks, React Router v6
- **Bootstrap 5** — Layout and responsive grid
- **Recharts** — Interactive charts (line, bar)
- **React Router v6** — Client-side routing
- **Docker + Docker Compose** — Containerized deployment
- **Mock API** — Built-in JS mock service (no backend needed)

---

## 📂 Project Structure

```
sugarpanel/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Layout.jsx      # App shell wrapper
│   │   ├── Sidebar.jsx     # Left navigation
│   │   ├── Topbar.jsx      # Top navigation bar
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.js # Authentication state (Context API)
│   ├── pages/
│   │   ├── LoginPage.jsx       # /login
│   │   ├── DashboardPage.jsx   # /dashboard
│   │   ├── ProductsPage.jsx    # /products  (list)
│   │   ├── ProductDetailPage.jsx # /products/:id
│   │   ├── UsersPage.jsx       # /users  (list)
│   │   └── UserDetailPage.jsx  # /users/:id
│   ├── services/
│   │   └── api.js         # API service layer (mock data)
│   ├── App.jsx             # Routes definition
│   ├── index.jsx           # Entry point
│   └── styles.css         # Global design system styles
├── mock-data/
│   └── db.json            # JSON Server mock data
├── public/
│   └── index.html
├── Dockerfile             # Multi-stage production build
├── docker-compose.yml     # Frontend + mock API
└── README.md
```

---

## 🖥 Running Locally

### Prerequisites
- Node.js 18+
- npm

### Steps

```bash
# 1. Clone the repo
git clone [https://github.com/your-username/sugarpanel.git](https://github.com/KarimASoliman3/SugarPanel.git)
cd sugarpanel

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

**Demo credentials:**
- Email: `admin@sugarpanel.com`
- Password: `password`

---

## 🐳 Docker Setup

### Build & Run with Docker Compose

```bash
# Build and start all services (frontend + mock API)
docker-compose up --build

# Run in detached mode
docker-compose up --build -d

# Stop services
docker-compose down
```

App will be available at: [http://localhost:3000](http://localhost:3000)
Mock API at: [http://localhost:3001](http://localhost:3001)

### Build Docker image only

```bash
docker build -t sugarpanel .
docker run -p 3000:80 sugarpanel
```

---

## ☁️ Deployment

### Vercel (Recommended — Easiest)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Drag & drop the `build/` folder to netlify.com/drop
# Or use Netlify CLI: netlify deploy --prod --dir=build
```

### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync build/ s3://your-bucket-name --delete
# Enable static website hosting on S3
# Create CloudFront distribution pointing to S3
```

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/login` | Authentication page |
| `/dashboard` | Main analytics dashboard |
| `/products` | Product list with search & pagination |
| `/products/:id` | Product detail & analytics |
| `/users` | User management list |
| `/users/:id` | User profile & activity |

---

## 🎨 Design Notes

- Matches the **Sugarpanel Figma** design with `DM Sans` + `Syne` typography
- CSS variables for consistent theming throughout
- Fully responsive — works on mobile and desktop
- Dark sidebar with blue accent color scheme (`#4285F4`)
