# Portfolio Backend

AI Engineer Portfolio için FastAPI backend servisi.

## Özellikler

- 🤖 **AI Asistan** - Gemini API ile sohbet
- 📧 **İletişim Formu** - Mesaj + email bildirimi
- 📊 **Analytics** - Sayfa görüntüleme takibi
- 🔐 **Security** - Rate limiting, CORS, API key

## Kurulum

### 1. Virtual Environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

```bash
cp .env.example .env
# .env dosyasını düzenle
```

### 4. Run Server

```bash
# Development
uvicorn app.main:app --reload --port 8000

# veya
python -m app.main
```

## API Documentation

Sunucu çalışırken:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |
| POST | `/api/v1/contact` | İletişim formu |
| POST | `/api/v1/chat` | AI sohbet |
| GET | `/api/v1/chat/suggestions` | Örnek sorular |
| POST | `/api/v1/analytics/pageview` | Sayfa görüntüleme |
| GET | `/api/v1/analytics/stats` | İstatistikler (admin) |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |
| `RESEND_API_KEY` | Resend email API key |
| `CONTACT_EMAIL` | Bildirim e-posta adresi |
| `CORS_ORIGINS` | İzin verilen origin'ler |
| `ADMIN_API_KEY` | Admin endpoint'leri için |

## Docker

```bash
docker build -t portfolio-backend .
docker run -p 8000:8000 --env-file .env portfolio-backend
```

## Lisans

MIT
