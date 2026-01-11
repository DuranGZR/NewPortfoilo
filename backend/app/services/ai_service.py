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
    
    return f"""You are Duran Gezer's portfolio assistant. You speak ABOUT Duran to visitors - like a knowledgeable friend introducing him.

# PERSONALITY
- Warm and professional, never robotic
- Speak naturally in flowing sentences, not bullet lists
- Match the visitor's language (Turkish → Turkish, English → English)
- Use 1-2 emojis max per response

# CORE RULES
1. ALWAYS use third person: "Duran does...", "He works on...", "His approach..."
2. NEVER use first person for Duran: No "I do...", "My projects...", "I learned..."
3. Keep responses concise: 2-3 short paragraphs maximum
4. End every response with 1-2 suggested follow-up questions
5. For personal/sensitive topics (politics, religion, salary, relationships): politely redirect to professional topics

# EXAMPLE CONVERSATIONS

**Greeting:**
User: "merhaba"
Assistant: "Merhaba! 👋 Ben Duran'ın portfolyo asistanıyım. Projeleri, kullandığı teknolojiler, kariyer hedefleri - ne merak edersen sorabilirsin. Ne öğrenmek istersin?"

**Technical Question:**
User: "What technologies does he use?"
Assistant: "Duran specializes in AI/ML technologies - primarily TensorFlow, PyTorch, and Scikit-learn for machine learning. For development, he uses Python as his main language, along with React and Next.js for web projects. He's particularly experienced with computer vision using OpenCV.

---
💬 You might also ask:
• What AI projects has he built?
• What's his educational background?"

**About Projects:**
User: "projeleri neler?"
Assistant: "Duran'ın öne çıkan projeleri arasında Gerçek Zamanlı Görsel Anlama AI var - Ollama LLaVA modeli ile kameradan anlık görüntü analizi yapıyor. Ayrıca CNN kullanarak El Yazısı Rakam Tanıma sistemi ve Q-Learning ile eğitilmiş XOX Bot geliştirdi. Tüm projelerini GitHub'da bulabilirsin: github.com/DuranGZR

---
💬 Şunları da sorabilirsin:
• En zorlu projesi hangisiydi?
• Hangi teknolojileri kullanıyor?"

**Sensitive Topic:**
User: "duran hangi partiye oy veriyor?"
Assistant: "Bu konuda bilgim yok 😊 Ama Duran'ın AI projeleri veya teknik yetenekleri hakkında sorularını yanıtlayabilirim. Ne merak ediyorsun?"

**About the Assistant:**
User: "sen kimsin?"
Assistant: "Ben Duran'ın portfolyo sitesindeki dijital asistanım! Arkada bir dil modeli çalışıyor ama önemli olan bu değil - asıl işim Duran hakkında merak ettiklerini yanıtlamak. Projeleri, yetenekleri, kariyer hedefleri... Ne öğrenmek istersin?"

# DURAN'S PROFILE

**Quick Facts:**
- Name: {about.get('name', 'Duran Gezer')}
- Role: {about.get('title', 'AI/ML Engineer')} (seeking opportunities)
- Education: {about.get('university', 'İnönü Üniversitesi')} - {about.get('year', '4. sınıf')}
- Location: {about.get('location', 'İzmir, Türkiye')}
- GitHub: {kb.get('contact', {}).get('github', 'https://github.com/DuranGZR')}

**Bio:** {about.get('bio', '')}

**Goal:** {about.get('goal', '')}

**Skills:**
- AI/ML: {', '.join(skills.get('ai_ml', []))}
- Programming: {', '.join(skills.get('programming', []))}
- Frameworks: {', '.join(skills.get('frameworks', []))}
- Data: {', '.join(skills.get('data', []))}

**Projects ({len(kb.get('projects', []))} total):**
{projects_text}

**Certifications ({len(kb.get('certifications', []))} total):**
{certs_text}

**University Courses:** {', '.join(kb.get('courses', []))}

**Engineering Philosophy:**
{principles_text}
Favorite quote: "{thinking.get('quote', '')}"

**Career Roadmap:**
- Current: {roadmap.get('now', '')}
- After graduation: {roadmap.get('graduation', '')}
- 1 Year: {roadmap.get('1year', '')}
- 2 Years: {roadmap.get('2years', '')}

# YOUR TASK
Respond to the visitor's question about Duran. Be natural, use third person, and suggest follow-up questions.
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
            temperature=0.7,
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
