"""
AI Service - Gemini Integration for Portfolio Assistant
"""
import json
from pathlib import Path
from typing import Dict, List, Optional

import google.generativeai as genai

from app.config import settings


# In-memory session storage (for production, use Redis or database)
_sessions: Dict[str, List[Dict]] = {}

# Knowledge base cache
_knowledge_base: Optional[Dict] = None


def load_knowledge_base() -> Dict:
    """Load knowledge base from JSON file."""
    global _knowledge_base
    
    if _knowledge_base is not None:
        return _knowledge_base
    
    kb_path = Path(__file__).parent.parent / "data" / "knowledge_base.json"
    
    if kb_path.exists():
        with open(kb_path, "r", encoding="utf-8") as f:
            _knowledge_base = json.load(f)
    else:
        # Default knowledge base
        _knowledge_base = {
            "about": {
                "name": "Duran Gezer",
                "title": "AI Engineer Candidate",
                "bio": "Bilgisayar Mühendisliği 4. sınıf öğrencisi, yapay zeka ve makine öğrenmesi alanında uzmanlaşıyor.",
                "approach": "Sadece modelleri eğitmiyor, çözümler tasarlıyor."
            },
            "skills": {
                "ai_ml": ["PyTorch", "TensorFlow", "Transformers", "NLP", "Computer Vision", "MLOps"],
                "programming": ["Python", "TypeScript", "JavaScript", "SQL", "C++"],
                "frameworks": ["Next.js", "React", "FastAPI", "Docker", "Git", "AWS"],
                "data": ["Pandas", "NumPy", "Data Visualization", "Time Series"]
            },
            "projects": [
                {
                    "name": "Sosyal Medya Duygu Analizi Motoru",
                    "description": "Transformer tabanlı NLP kullanarak %87 doğrulukla sosyal medya gönderilerini analiz eden gerçek zamanlı duygu algılama sistemi.",
                    "tech": ["Transformers", "PyTorch", "BERT", "FastAPI", "React"],
                    "impact": "500+ post/dakika işleme kapasitesi"
                },
                {
                    "name": "Kestirimci Bakım Sistemi",
                    "description": "Üretim tesisleri için %92 hassasiyetle ekipman arızalarını 72 saat önceden tahmin eden ML destekli sistem.",
                    "tech": ["XGBoost", "Time Series", "IoT", "Python", "AWS"],
                    "impact": "2 milyon dolarlık ekipman hasarını önledi"
                },
                {
                    "name": "Kod İnceleme Asistanı",
                    "description": "Bağlamı anlayan ve mimari iyileştirmeler öneren AI destekli araç.",
                    "tech": ["GPT-4", "AST Analysis", "TypeScript", "VS Code API"],
                    "impact": "Kod inceleme süresini %40 azalttı"
                },
                {
                    "name": "Depo Görüş Sistemi",
                    "description": "YOLO v8 kullanarak %95 algılama doğruluğu ile otomatik envanter takibi.",
                    "tech": ["YOLOv8", "OpenCV", "Edge AI", "Raspberry Pi"],
                    "impact": "Envanter denetim süresini 8 saatten 20 dakikaya düşürdü"
                }
            ],
            "experience": [
                {
                    "title": "AI Mühendisliği Stajyeri",
                    "period": "Yaz 2024",
                    "description": "ML pipeline'ları oluşturdu ve modelleri üretime aldı"
                },
                {
                    "title": "Serbest ML Geliştirici",
                    "period": "2023 - Devam",
                    "description": "Küçük işletmeler ve girişimler için özel AI çözümleri"
                }
            ],
            "achievements": [
                "AI Hackathon 2024 - 2. Yer",
                "Üniversite ML Yarışması - 1. Yer"
            ],
            "goals": [
                "6 ay içinde Junior AI Engineer pozisyonu",
                "1 yıl içinde derin teknik uzmanlık",
                "2 yıl içinde teknik liderlik"
            ],
            "thinking": {
                "principles": [
                    "İlk ilkeler, kalıplar değil",
                    "Çıktıdan çok sonuç",
                    "Hızlı iterasyonlar mükemmel planları yener",
                    "Sistem düşüncesi"
                ],
                "quote": "En iyi model, üretimde çalışan modeldir."
            }
        }
    
    return _knowledge_base


def get_system_prompt() -> str:
    """Generate system prompt with knowledge base."""
    kb = load_knowledge_base()
    
    return f"""Sen Duran Gezer'in AI asistanısın. Ziyaretçilerin Duran hakkında sorularını yanıtlıyorsun.

## Kurallar:
1. Samimi ama profesyonel ol
2. Soruyu algıladığın dilde yanıtla (Türkçe veya İngilizce)
3. Bilmediğin konularda "Bu konuda bilgim yok" de
4. Yanıtlarını kısa ve öz tut (2-3 paragraf max)
5. Teknik sorularda detaylı, genel sorularda özet bilgi ver

## Duran Hakkında Bilgiler:

### Genel
- İsim: {kb['about']['name']}
- Unvan: {kb['about']['title']}
- Bio: {kb['about']['bio']}

### Yetenekler
- AI/ML: {', '.join(kb['skills']['ai_ml'])}
- Programlama: {', '.join(kb['skills']['programming'])}
- Frameworks: {', '.join(kb['skills']['frameworks'])}

### Projeler
{chr(10).join([f"- {p['name']}: {p['description']}" for p in kb['projects']])}

### Deneyim
{chr(10).join([f"- {e['title']} ({e['period']}): {e['description']}" for e in kb['experience']])}

### Başarılar
{chr(10).join([f"- {a}" for a in kb['achievements']])}

### Hedefler
{chr(10).join([f"- {g}" for g in kb['goals']])}

### Düşünce Tarzı
- İlkeler: {', '.join(kb['thinking']['principles'])}
- Alıntı: "{kb['thinking']['quote']}"

Şimdi ziyaretçinin sorusunu yanıtla:
"""


async def get_ai_response(message: str, session_id: str) -> str:
    """
    Get AI response for a chat message.
    
    Args:
        message: User's message
        session_id: Session ID for context
        
    Returns:
        AI assistant's response
    """
    if not settings.gemini_api_key:
        return "AI asistan şu anda yapılandırılmamış. Lütfen daha sonra tekrar deneyin."
    
    try:
        # Configure Gemini
        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Get or create session history
        if session_id not in _sessions:
            _sessions[session_id] = []
        
        history = _sessions[session_id]
        
        # Build prompt with history
        system_prompt = get_system_prompt()
        
        # Format conversation history
        conversation = system_prompt + "\n\n"
        for msg in history[-10:]:  # Last 10 messages for context
            role = "Kullanıcı" if msg["role"] == "user" else "Asistan"
            conversation += f"{role}: {msg['content']}\n\n"
        
        conversation += f"Kullanıcı: {message}\n\nAsistan:"
        
        # Generate response
        response = model.generate_content(conversation)
        ai_response = response.text.strip()
        
        # Update session history
        history.append({"role": "user", "content": message})
        history.append({"role": "assistant", "content": ai_response})
        _sessions[session_id] = history
        
        return ai_response
        
    except Exception as e:
        print(f"AI service error: {e}")
        return "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin."
