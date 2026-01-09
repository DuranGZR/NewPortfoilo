# 🚀 Next-Gen Interactive 3D Portfolio

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)
![Python](https://img.shields.io/badge/Python-3.11-3776AB)
![Three.js](https://img.shields.io/badge/Three.js-R3F-white)

> **"Not just a portfolio, but a journey through my digital mind."**

Welcome to my personal portfolio repository! This project represents the convergence of modern web technologies, 3D interactive design, and Artificial Intelligence. It's built to offer an immersive user experience while demonstrating advanced full-stack capabilities.

---

## 🌟 Key Features

### 🎨 Immersive 3D Experience
- **Interactive World:** Built with **React Three Fiber** and **Drei**, featuring a navigable 3D island scene.
- **Dynamic Visuals:** Custom shaders, particle effects, and physics-based animations that react to user interaction.
- **Performance Optimized:** Smooth rendering with efficient model loading and memory management.

### 🧠 AI-Powered Assistant
- **Smart Conversations:** Integrated **Google Gemini Pro** to power a context-aware AI assistant.
- **Portfolio Expert:** The AI is trained on my resume and portfolio data, capable of answering recruiters' questions about my skills, experience, and projects in real-time.

### ⚡ Cutting-Edge Tech Stack
- **Frontend:** Next.js 15 (App Router), TailwindCSS v4, Framer Motion for smooth UI transitions.
- **Backend:** High-performance **FastAPI** service handling AI requests, analytics, and contact forms.
- **Architecture:** Clean Architecture with separate frontend/backend concerns and type safety.

### 🛠️ Comprehensive Admin Panel
- **Full Content Control:** A secure admin dashboard to manage Projects, Skills, Experience, and Roadmap entries without touching code.
- **Live Updates:** Changes in the admin panel reflect instantly on the live site.

### 🌍 Global Reach
- **Internationalization (i18n):** Native support for **Turkish (TR)** and **English (EN)** with seamless switching.
- **Responsive Design:** Flawless experience across all devices, from 4K desktops to mobile phones.

---

## 🏗️ Technology Stack

| Domain | Technologies |
|--------|--------------|
| **Frontend** | Next.js 15, React 19, TypeScript, TailwindCSS, Framer Motion |
| **3D & Graphics** | Three.js, React Three Fiber, Drei, GSAP |
| **Backend** | Python, FastAPI, Pydantic, Uvicorn |
| **Database** | SQLite (Dev) / PostgreSQL (Prod), SQLAlchemy |
| **AI & ML** | Google Gemini API, LangChain (Concepts) |
| **DevOps** | Docker, GitHub Actions (Planned), Vercel |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/DuranGZR/NewPortfoilo.git
cd NewPortfoilo
```

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
# or
yarn install
```

Create a `.env.local` file in the `frontend` root:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the development server:
```bash
npm run dev
```
*Frontend will be running at `http://localhost:3000`*

### 3. Backend Setup
Navigate to the backend directory:
```bash
cd ../backend
```

Create a virtual environment and activate it:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend` root:
```env
# AI Configuration
GOOGLE_API_KEY=your_gemini_api_key_here

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your_email@example.com

# Security
SECRET_KEY=your_super_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```
*Backend will be running at `http://localhost:8000`*

---

## 📂 Project Structure

```bash
NewPortfoilo/
├── frontend/             # Next.js Application
│   ├── app/              # App Router Pages & Layouts
│   ├── components/       # Reusable UI & 3D Components
│   ├── public/           # Static Assets (3D models, icons)
│   └── ...
├── backend/              # FastAPI Application
│   ├── app/
│   │   ├── api/          # API Endpoints (v1)
│   │   ├── core/         # Config & Security
│   │   ├── models/       # Database Models
│   │   └── services/     # Business Logic (AI, Email)
│   └── ...
└── ...
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Duran** - [GitHub](https://github.com/DuranGZR)

Project Link: [https://github.com/DuranGZR/NewPortfoilo](https://github.com/DuranGZR/NewPortfoilo)
