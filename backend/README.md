# FastAPI Backend Service

Production-ready backend service for the AI Engineer Portfolio, powering the AI assistant, contact form, and analytics.

## 🚀 Features

- **🤖 AI Assistant** - Powered by **Groq (Llama 3.1)** for ultra-fast responses
- **📧 Contact System** - Email delivery via **Resend**
- **📊 Analytics** - Privacy-friendly page view tracking
- **🛡️ Security** - Rate limiting, CORS configuration, Trusted Host middleware
- **⚡ Performance** - Async/await architecture

## 🛠️ Tech Stack

- **Framework**: FastAPI (Python 3.10+)
- **Server**: Uvicorn (ASGI)
- **AI**: Groq SDK (`llama-3.1-8b-instant`)
- **Validation**: Pydantic v2
- **Email**: Resend SDK

## ⚡ Quick Start

### 1. Setup Environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Create a `.env` file in the `backend` directory:

```env
# === AI Service (REQUIRED) ===
GROQ_API_KEY=gsk_your_key_here

# === Email Service (Optional) ===
RESEND_API_KEY=re_your_key_here
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=contact@durangezer.com

# === Security ===
SECRET_KEY=your_secret_key_here
BACKEND_CORS_ORIGINS=["http://localhost:3000", "https://durangezer.com"]
```

### 4. Run Server

```bash
# Development (Auto-reload)
uvicorn app.main:app --reload --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once the server is running, meaningful documentation is automatically generated:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🔌 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/chat` | AI Chat completion |
| `POST` | `/api/v1/contact` | Send contact email |
| `GET` | `/api/v1/analytics` | Track page views |
| `GET` | `/api/v1/health` | Health check probe |

## 🧠 AI Configuration

The AI service is configured in `app/services/ai_service.py`.
- **Model**: `llama-3.1-8b-instant`
- **Context**: Loads from `app/data/knowledge_base.json`
- **Prompt**: Uses a specialized system prompt for third-person responses.

## 📦 Deployment

**Docker Build:**

```bash
docker build -t portfolio-backend .
docker run -p 8000:8000 --env-file .env portfolio-backend
```

## 📄 License

MIT © Duran Gezer
