"""
AI Service - Groq Integration for Portfolio Assistant
Uses Groq API with Llama 3.3 70B model
"""
import json
from pathlib import Path
from typing import Dict, List, Optional

from groq import Groq

from app.config import settings


# In-memory session storage (for production, use Redis or database)
_sessions: Dict[str, List[Dict]] = {}

# Knowledge base cache
_knowledge_base: Optional[Dict] = None

# Groq client
_client: Optional[Groq] = None


def get_client() -> Groq:
    """Get or create Groq client."""
    global _client
    if _client is None:
        _client = Groq(api_key=settings.groq_api_key)
    return _client


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
        # Minimal fallback - JSON dosyası yoksa
        _knowledge_base = {
            "about": {"name": "Duran Gezer", "title": "AI/ML Engineer"},
            "skills": {"ai_ml": [], "programming": [], "frameworks": [], "data": []},
            "projects": [],
            "certifications": [],
            "courses": [],
            "thinking": {"principles": [], "quote": ""},
            "roadmap": {},
            "contact": {"github": "https://github.com/DuranGZR"},
            "highlights": []
        }
    
    return _knowledge_base


def get_system_prompt() -> str:
    """Generate system prompt with knowledge base."""
    kb = load_knowledge_base()
    
    # Format projects with GitHub links
    projects_text = ""
    for p in kb.get('projects', []):
        github_link = p.get('github', '')
        projects_text += f"- **{p['name']}** ({p.get('year', '')}): {p['description']}\n"
        projects_text += f"  Teknolojiler: {', '.join(p['tech'])}\n"
        if github_link:
            projects_text += f"  GitHub: {github_link}\n"
        projects_text += "\n"
    
    # Format certifications
    certs_text = ""
    for c in kb.get('certifications', []):
        certs_text += f"- {c['title']} ({c['organization']}, {c['year']}): {c['description']}\n"
    
    # Format community activities
    community_text = ""
    for ca in kb.get('community_activities', []):
        community_text += f"- **{ca['title']}** - {ca['organization']} ({ca['period']})\n"
        community_text += f"  {ca['description']}\n"
        if ca.get('skills_gained'):
            community_text += f"  Kazanılan yetenekler: {', '.join(ca['skills_gained'])}\n"
        community_text += "\n"
    
    # Format skills
    skills = kb.get('skills', {})
    
    # Format thinking principles
    thinking = kb.get('thinking', {})
    principles_text = "\n".join([f"- {p}" for p in thinking.get('principles', [])])
    
    # Format roadmap
    roadmap = kb.get('roadmap', {})
    
    about = kb.get('about', {})
    
    from datetime import datetime
    current_date = datetime.now().strftime("%d %B %Y")
    
    return f"""Sen Duran Gezer'in portfolyo asistanısın. SADECE Duran hakkında soruları yanıtlarsın.

# KRİTİK KURALLAR - MUTLAKA UYULMALI

## 1. KAPSAM SINIRI
SADECE şu konularda yanıt ver:
- Duran'ın projeleri, yetenekleri, deneyimleri
- Duran'ın eğitimi, sertifikaları, kursları
- Duran'ın kariyer hedefleri ve yol haritası
- Duran'ın mühendislik felsefesi
- Duran ile iletişim bilgileri
- Portfolyo sitesi hakkında genel sorular

## 2. REDDEDİLECEK KONULAR
Aşağıdaki konularda ASLA yanıt verme, kibarca reddet:
- Küfür, hakaret, argo içeren mesajlar
- Politika, din, spor takımları
- Duran'ın özel hayatı, ilişkileri, maaşı
- Genel sohbet, şakalar, espiriler
- Duran dışındaki konular (hava durumu, haberler, başka kişiler)
- Kod yazma, ödev yapma, çeviri istekleri
- Her türlü uygunsuz veya alakasız içerik

## 3. REDDETME ŞEKLİ
Kapsam dışı mesajlara SADECE şu formatta yanıt ver:
"Bu konuda yardımcı olamıyorum 😊 Ben sadece Duran'ın projeleri, yetenekleri ve kariyer hedefleri hakkında bilgi verebilirim. Ne öğrenmek istersin?"

## 4. YANIT FORMATI
- Türkçe sorulara Türkçe, İngilizce sorulara İngilizce yanıt ver
- Kısa ve öz tut (2-3 paragraf max)
- Her zaman 3. tekil şahıs kullan: "Duran şunu yapıyor...", "Onun projeleri..."
- ASLA 1. tekil şahıs kullanma: "Ben yaptım...", "Projelerim..."
- Her yanıtın sonunda 1-2 takip sorusu öner

# DURAN'IN PROFİLİ

**Temel Bilgiler:**
- İsim: {about.get('name', 'Duran Gezer')}
- Unvan: {about.get('title', 'AI/ML Engineer')}
- Eğitim: {about.get('university', 'İnönü Üniversitesi')} - {about.get('year', '4. sınıf')}
- Konum: {about.get('location', 'İzmir, Türkiye')}
- GitHub: {kb.get('contact', {}).get('github', 'https://github.com/DuranGZR')}
- E-posta: contact@durangezer.com

**Hakkında:** {about.get('bio', '')}

**Hedefi:** {about.get('goal', '')}

**Yetenekler:**
- AI/ML: {', '.join(skills.get('ai_ml', []))}
- Programlama: {', '.join(skills.get('programming', []))}
- Framework'ler: {', '.join(skills.get('frameworks', []))}
- Data: {', '.join(skills.get('data', []))}

**Projeler ({len(kb.get('projects', []))} adet):**
{projects_text}

**Sertifikalar ({len(kb.get('certifications', []))} adet):**
{certs_text}

**Topluluk Aktiviteleri & Gönüllü Çalışmalar:**
{community_text}

**Üniversite Dersleri:** {', '.join(kb.get('courses', []))}

**Mühendislik Felsefesi:**
{principles_text}
Favori söz: "{thinking.get('quote', '')}"

**Kariyer Yol Haritası:**
- Şu an: {roadmap.get('now', '')}
- Mezuniyet sonrası: {roadmap.get('graduation', '')}
- 1 Yıl: {roadmap.get('1year', '')}
- 2 Yıl: {roadmap.get('2years', '')}

# ÖRNEK YANITLAR

**Selamlama:**
Kullanıcı: "merhaba"
Sen: "Merhaba! 👋 Ben Duran'ın portfolyo asistanıyım. Projeleri, yetenekleri veya kariyer hedefleri hakkında ne öğrenmek istersin?"

**Proje Sorusu:**
Kullanıcı: "projeleri neler?"
Sen: "Duran'ın öne çıkan projeleri arasında Gerçek Zamanlı Görsel Anlama AI var - Ollama LLaVA modeli ile kameradan anlık görüntü analizi yapıyor. Ayrıca CNN kullanarak El Yazısı Rakam Tanıma sistemi ve Q-Learning ile eğitilmiş XOX Bot geliştirdi.

---
💬 Şunları da sorabilirsin:
• Hangi teknolojileri kullanıyor?
• Kariyer hedefleri neler?"

**Alakasız/Uygunsuz Mesaj:**
Kullanıcı: (küfür, alakasız konu, genel sohbet vb.)
Sen: "Bu konuda yardımcı olamıyorum 😊 Ben sadece Duran'ın projeleri, yetenekleri ve kariyer hedefleri hakkında bilgi verebilirim. Ne öğrenmek istersin?"

# GÖREVİN
Ziyaretçinin Duran hakkındaki sorusunu yanıtla. Kapsam dışı HER ŞEYİ kibarca reddet.
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
    if not settings.groq_api_key:
        return "AI asistan şu anda yapılandırılmamış. Lütfen daha sonra tekrar deneyin."
    
    try:
        client = get_client()
        
        # Get or create session history
        if session_id not in _sessions:
            _sessions[session_id] = []
        
        history = _sessions[session_id]
        
        # Build messages for Groq API
        system_prompt = get_system_prompt()
        
        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        # Add conversation history (last 10 messages)
        for msg in history[-10:]:
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })
        
        # Add current user message
        messages.append({"role": "user", "content": message})
        
        # Generate response using Groq API
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.5,
            max_tokens=1024,
        )
        
        ai_response = response.choices[0].message.content.strip()
        
        # Update session history
        history.append({"role": "user", "content": message})
        history.append({"role": "assistant", "content": ai_response})
        _sessions[session_id] = history
        
        return ai_response
        
    except Exception as e:
        print(f"AI service error: {e}")
        return "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin."
