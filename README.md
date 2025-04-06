# 🧾 TaskManagerX – Full-Stack Task Manager (Next.js + ASP.NET Core)

Welcome to **TaskManagerX**, a secure full-stack task management app built with **Next.js** (React) on the frontend and **ASP.NET Core Web API** on the backend. Authenticated users can register, log in, and manage tasks via a clean, responsive interface.

---

## 🧠 Project Overview

- 🔐 **JWT-based Auth**
- 📦 **CRUD API for Tasks**
- 🌓 **Dark mode-ready UI**
- 🔄 **Live task updates on edit/save**
- 🌍 **Timezone-aware due dates**

---

# 📁 Folder Structure

```
/task-manager-frontend    ← Next.js frontend (React, TailwindCSS)
/task-manager-api         ← ASP.NET Core backend (C#, EF Core, PostgreSQL)
```

---

# 💻 Frontend – Next.js + TailwindCSS

### 📂 `/task-manager-frontend`

### ✅ Features
- User login + token storage
- Protected `/tasks` route
- Create / Edit / Delete tasks
- Dark-mode friendly header and styling
- API calls via Axios with token headers

### 🛠 Tech Stack
- React (Next.js App Router)
- TypeScript + TailwindCSS
- Axios for API calls
- ESLint + Prettier

### 🚀 Getting Started

```bash
cd task-manager-frontend

# Install dependencies
npm install

# Set environment variables
cp .env.local.example .env.local

# Run the frontend
npm run dev
```

### 🌐 `.env.local`
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5203
```

---

# ✅ How It Works

1. User registers or logs in → gets a JWT
2. JWT stored in `localStorage`
3. All task requests include `Authorization: Bearer <token>`
4. Tasks can be added, edited inline, or deleted

---

# 📸 Screenshots

---

# ✨ Future Improvements
- Password reset
- Task tagging + filtering
- User profile / settings page
- Improved animations with Framer Motion

---

# 👩‍💻 Author
**Aleksandra** – Full-stack developer based in Switzerland 🇨🇭
---
