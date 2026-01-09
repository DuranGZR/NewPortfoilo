# 🚀 LIVING AI PORTFOLIO - Detaylı Blueprint

> Duran Gezer için profesyonel, geleceğe yönelik AI Engineer portfolyosu

---

## 📋 İçindekiler
1. [Hero Section](#1-hero-section)
2. [Projects Section](#2-projects-section)
3. [Engineering Thinking Section](#3-engineering-thinking-section)
4. [Skill Map](#4-skill-map)
5. [Roadmap](#5-roadmap)
6. [AI Assistant Placeholder](#6-ai-assistant-placeholder)
7. [Design System Detayları](#7-design-system-detayları)
8. [Copy & Content Örnekleri](#8-copy--content-örnekleri)

---

## 1. HERO SECTION

### Amaç
Güçlü ilk izlenim, net identity, future-focused positioning.

### Layout (Desktop)
```
┌─────────────────────────────────────────────────────┐
│                                                       │
│   [Subtle Animated Background - Gradient Mesh]       │
│                                                       │
│              DURAN GEZER                              │
│         AI Engineer in Training                       │
│                                                       │
│  Building intelligent systems that solve real         │
│  problems, not just implement algorithms.             │
│                                                       │
│    [Explore Projects]  [Talk to AI Assistant]        │
│                                                       │
│         ↓ Scroll to discover more                     │
└─────────────────────────────────────────────────────┘
```

### Content Elements

#### Headline (3 Seçenek)
1. **"Engineering Intelligence, Not Just Implementing It"**
   - Positioning: Düşünen engineer
   
2. **"Building AI Systems That Actually Work in Production"**
   - Positioning: Pragmatic, production-focused

3. **"From Computer Science to Computational Intelligence"**
   - Positioning: Academic → Applied transition

**ÖNERİLEN**: Option 2 (En net value proposition)

#### Subheadline
```
4th-year Computer Engineering student specializing in AI/ML.
System thinker. Problem solver. Future-oriented.

I don't just train models — I architect solutions.
```

#### CTA Buttons
- **Primary**: "Explore My Models" → scroll to projects
- **Secondary**: "Talk to My AI Assistant" → open chat (Phase 3)

#### Scroll Indicator
Minimal animated arrow: "↓ Discover more"

### Visual Design

#### Background
```css
background: linear-gradient(135deg, #0b0f14 0%, #1a1f2e 100%);
```

**Animated Gradient Mesh**:
- Subtle moving gradients (cyan/blue tones)
- Speed: Very slow (20s duration)
- Tool: CSS @keyframes veya Framer Motion

#### Typography
```
Headline: 
  font: Space Grotesk, 64px, Bold
  color: #e2e8f0
  letter-spacing: -0.02em

Subheadline:
  font: Inter, 20px, Regular
  color: #94a3b8
  line-height: 1.6
```

#### Animations
1. **On Load**:
   - Name fade in + slide up (0.8s, easeOut)
   - Subheadline fade in (1s delay, 0.6s duration)
   - CTAs fade in (1.5s delay, 0.5s duration)

2. **Idle State**:
   - Subtle glow pulse on name (2s loop)
   - Background gradient slow motion

---

## 2. PROJECTS SECTION

### Amaç
Engineering case studies - nasıl düşündüğünü göster, sadece ne yaptığını değil.

### Layout
```
┌──────────────────────────────────────────────────┐
│                                                    │
│         PROJECTS AS ENGINEERING STORIES            │
│                                                    │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐     │
│  │           │  │           │  │           │     │
│  │ Project 1 │  │ Project 2 │  │ Project 3 │     │
│  │           │  │           │  │           │     │
│  │ [Details] │  │ [Details] │  │ [Details] │     │
│  └───────────┘  └───────────┘  └───────────┘     │
│                                                    │
│  ┌───────────┐  ┌───────────┐                     │
│  │           │  │           │                     │
│  │ Project 4 │  │ Project 5 │                     │
│  │ (Planned) │  │ (Planned) │                     │
│  └───────────┘  └───────────┘                     │
└──────────────────────────────────────────────────┘
```

### Project Card Design

#### Card Visual (Glassmorphism)
```css
.project-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 40px rgba(0, 217, 255, 0.3);
  border-color: rgba(0, 217, 255, 0.3);
}
```

#### Card Content Structure
```
┌─────────────────────────────┐
│  [Tag: Completed/Planned]   │
│                             │
│  Project Title              │
│  One-line description       │
│                             │
│  Problem:                   │
│  What problem does it solve│
│                             │
│  Approach:                  │
│  Key technical decisions    │
│                             │
│  Tech: PyTorch | FastAPI... │
│                             │
│  [View Case Study →]        │
└─────────────────────────────┘
```

### Placeholder Projects (4 Realistic Examples)

#### Project 1: Product Review Sentiment Analyzer (Completed)
```yaml
Title: "E-commerce Review Intelligence System"
Status: Completed
One-liner: "Multi-class sentiment analysis on Turkish product reviews with 89% accuracy"

Problem:
  "E-commerce platforms need automated review analysis. Turkish language
  lacks robust pre-trained models for sentiment nuances in product reviews."

Constraints:
  - Limited labeled Turkish review dataset
  - Need for multi-class (positive/negative/neutral/mixed)
  - Real-time inference requirement (<200ms)
  - Cost-effective (can't use GPT-4 for all reviews)

Approach:
  "Fine-tuned BERTurk on custom-labeled dataset. Implemented ensemble
  with rule-based fallback for edge cases. Optimized inference with ONNX."

Model Choice:
  Name: "BERTurk (Transformer)"
  Rationale: 
    "Tried LSTM baseline (76% accuracy) but transformer architecture
    captured contextual nuances better. BERTurk chosen over multilingual
    BERT due to 12% accuracy gain on Turkish-specific idioms."

Evaluation:
  Metrics:
    - Accuracy: 89%
    - F1-Score (weighted): 0.87
    - Inference time: 145ms average
  Approach: "K-fold cross-validation, separate test set from different platforms"

Outcome:
  "Successfully deployed to staging. Reduced manual review classification
  time by 80%. Identified 23% more actionable customer feedback."

Learnings:
  - Data quality > model complexity for this use case
  - Class imbalance required weighted loss function
  - ONNX quantization crucial for production speed
  - Rule-based fallback prevented hallucination on ambiguous cases

Tech Stack:
  - PyTorch, Transformers (HuggingFace)
  - FastAPI, ONNX Runtime
  - Docker, PostgreSQL
  - Scikit-learn (evaluation)

Links:
  GitHub: github.com/durangezer/review-sentiment (placeholder)
  Demo: Not public yet
```

#### Project 2: Predictive Maintenance for IoT Sensors (In Progress)
```yaml
Title: "Factory Equipment Failure Prediction"
Status: In Progress (70% complete)
One-liner: "Time-series anomaly detection for predicting equipment failures 4-6 hours in advance"

Problem:
  "Manufacturing downtime costs $260K per hour. Reactive maintenance
  is expensive. Need predictive system to prevent failures."

Constraints:
  - Noisy sensor data (vibration, temperature, pressure)
  - Class imbalance (99.8% normal, 0.2% failure)
  - Must minimize false positives (unnecessary shutdowns costly)
  - Edge deployment preferred (low latency, data privacy)

Approach:
  "LSTM-based autoencoder for anomaly detection. Threshold tuning
  optimized for precision>0.85. Currently implementing online learning
  for drift adaptation."

Model Choice:
  Name: "LSTM Autoencoder"
  Rationale:
    "Evaluated ARIMA (too simple), Isolation Forest (poor with temporal
    patterns), and Transformer (overkill). LSTM autoencoder balanced
    complexity and explainability while handling time-series naturally."

Evaluation:
  Metrics:
    - Precision: 0.87 (target: 0.85+)
    - Recall: 0.74 (improving)
    - Lead time: 4.2 hours average
  Approach: "Time-series split validation, separate factory line for testing"

Outcome:
  "Currently in testing phase. Early results show 65% reduction in
  unplanned downtime on test equipment."

Learnings:
  - Domain knowledge critical (worked with factory engineers)
  - Feature engineering > raw sensor data
  - Explainability matters (engineers need to trust predictions)
  - Edge deployment harder than expected (optimization ongoing)

Tech Stack:
  - TensorFlow/Keras
  - TensorFlow Lite (edge deployment)
  - InfluxDB (time-series DB)
  - Grafana (monitoring)
  - Python, NumPy, Pandas

Links:
  GitHub: Private (company project)
  Demo: Internal only
```

#### Project 3: AI-Powered Code Review Assistant (Planned)
```yaml
Title: "Intelligent Code Review Copilot"
Status: Planned (Research phase)
One-liner: "LLM-based assistant for suggesting code improvements and catching anti-patterns"

Problem:
  "Code reviews are time-consuming and quality varies by reviewer.
  Need automated first-pass to catch common issues, freeing humans
  for architectural decisions."

Constraints:
  - Must understand multiple languages (Python, JS, Java)
  - Context awareness (whole file, not just snippet)
  - No false positives on stylistic preferences
  - Privacy (code stays local or private cloud)

Approach (Planned):
  "Fine-tune CodeLLaMA on curated code review comments. Implement
  RAG for project-specific patterns. Rule-based filters for style issues."

Model Choice:
  Name: "CodeLLaMA (13B) + RAG"
  Rationale:
    "Open-source (privacy), specialized for code, reasonable size
    for fine-tuning. RAG adds project context without retraining."

Evaluation (Planned):
  Metrics:
    - Precision on bug detection (target: >0.8)
    - Developer acceptance rate (target: >60%)
    - Time saved per review (target: 15+ minutes)
  Approach: "A/B test with dev team, manual annotation of suggestions"

Tech Stack (Planned):
  - CodeLLaMA, LangChain
  - ChromaDB (vector store)
  - FastAPI
  - VS Code Extension (frontend)

Why Planned:
  "Researching feasibility. Exploring whether local LLM can compete
  with GitHub Copilot while maintaining privacy. Timeline: Q1 2026."
```

#### Project 4: Real-time Object Detection for Warehouse Automation (Planned)
```yaml
Title: "Smart Inventory Vision System"
Status: Planned (Concept phase)
One-liner: "YOLOv8-based real-time detection for automated inventory tracking"

Problem:
  "Manual inventory counting is error-prone and slow. Need automated
  system to track items on conveyor belts."

Constraints (Expected):
  - Real-time (>30 FPS)
  - High accuracy (misses costly)
  - Variable lighting conditions
  - Edge deployment (camera on device)

Approach (Planned):
  "YOLOv8 fine-tuned on warehouse items. Data augmentation for lighting
  variations. TensorRT optimization for edge GPU."

Model Choice:
  Name: "YOLOv8"
  Rationale:
    "Industry standard for real-time detection. Better speed-accuracy
    tradeoff than RCNN. Easier edge deployment than transformers."

Tech Stack (Planned):
  - YOLOv8, PyTorch
  - TensorRT (optimization)
  - OpenCV
  - NVIDIA Jetson (edge device)

Why Planned:
  "Need access to warehouse for data collection. Exploring partnerships
  with logistics companies. Timeline: Q2 2026."
```

### Project Detail Modal/Page
Kart'a tıklanınca:
- Expand ile full case study
- Veya separate page (/projects/[slug])
- Görsel: Architecture diagram, metrics charts, demo video

---

## 3. ENGINEERING THINKING SECTION

### Amaç
Decision-making ability göstermek. Tool listesi değil, thought process.

### Layout
```
┌──────────────────────────────────────────────────┐
│                                                    │
│      HOW I THINK AS AN ENGINEER                    │
│                                                    │
│  These are the frameworks that guide my            │
│  technical decisions:                              │
│                                                    │
│  ┌─────────────────┐  ┌─────────────────┐         │
│  │  Model          │  │  Production     │         │
│  │  Selection      │  │  Reality        │         │
│  └─────────────────┘  └─────────────────┘         │
│                                                    │
│  ┌─────────────────┐  ┌─────────────────┐         │
│  │  Overfitting    │  │  Trade-offs     │         │
│  │  & Bias         │  │  Framework      │         │
│  └─────────────────┘  └─────────────────┘         │
│                                                    │
│  ┌─────────────────┐  ┌─────────────────┐         │
│  │  When NOT to    │  │  Academic vs    │         │
│  │  use AI         │  │  Applied        │         │
│  └─────────────────┘  └─────────────────┘         │
└──────────────────────────────────────────────────┘
```

### Content Cards (6 Topics)

#### 1. Model Selection Framework
```
Title: "Model Selection Framework"
Icon: 🧠

Content:
"I don't start with 'let's use a neural network.' I start with:

1. What's the baseline? (Rule-based, simple ML)
2. Does complexity improve outcomes enough?
3. Can we explain the predictions?
4. What's the inference cost?

Example: In the review sentiment project, LSTM gave 76% accuracy.
BERTurk gave 89%. But for some use cases, that 13% isn't worth
the 10x inference cost. Context matters."

Key Principle: "Simplest model that solves the problem."
```

#### 2. Production vs Academia
```
Title: "Production Reality"
Icon: ⚙️

Content:
"Academic papers optimize for accuracy. Production optimizes for:

- Latency (users won't wait 5s)
- Cost (GPT-4 API isn't free)
- Maintainability (can others debug this?)
- Drift (will it still work next month?)

The 'best' model in a paper is often not the best in production.
I learned this the hard way when my 'sota' model couldn't fit
in a 2GB container."

Key Principle: "Ship beats perfect."
```

#### 3. Overfitting & Bias
```
Title: "Overfitting & Bias"
Icon: 📊

Content:
"Two failure modes I actively fight:

Overfitting: Model memorizes training data, fails on real world.
- Fix: Cross-validation, separate test set, regularization

Bias: Model works for some groups, fails for others.
- Fix: Stratified sampling, fairness metrics, diverse test data

Example: My first sentiment model worked great on electronics
reviews but failed on clothing. The training data was biased."

Key Principle: "Trust but verify. Especially on edge cases."
```

#### 4. Trade-offs Framework
```
Title: "The Trade-offs Triangle"
Icon: ⚖️

Content:
"Every decision is a trade-off between three dimensions:

         Accuracy
            ▲
           / \
          /   \
         /     \
        /       \
   Speed ◀─────▶ Cost

You can optimize two, not all three.

Fast + Accurate = Expensive (GPT-4)
Fast + Cheap = Less accurate (rule-based)
Accurate + Cheap = Slow (large local model)

I make trade-offs explicit in every design doc."

Key Principle: "There's no free lunch in ML."
```

#### 5. When NOT to Use AI
```
Title: "When NOT to Use AI"
Icon: 🚫

Content:
"AI is not always the answer. Sometimes, it's the wrong tool:

Don't use AI when:
- A simple rule works (if temperature > 100°C, alert)
- You have < 1000 labeled samples
- Explainability is legally required
- Maintenance cost exceeds value
- A database query solves it

I've talked clients out of AI projects. That's good engineering."

Key Principle: "Right tool for the job."
```

#### 6. Academic vs Applied
```
Title: "Academic vs Applied AI"
Icon: 🎓

Content:
"I respect academic research but think like an applied engineer:

Academic: 'This model achieves 94.5% on ImageNet'
Applied: 'Does it work on our blurry phone photos?'

Academic: 'State-of-the-art architecture'
Applied: 'Can we deploy it?'

Both matter. Academia pushes boundaries. Application makes it useful.
I bridge both worlds."

Key Principle: "Theory guides, reality decides."
```

### Card Design (Same Glassmorphism Style)
```css
.thinking-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
}

.thinking-card:hover {
  border-color: rgba(0, 217, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

## 4. SKILL MAP

### Amaç
Depth ve breadth göstermek. Bar charts değil, interactive network.

### Visualization Type: Network Graph
```
        ML/DL
      /   |   \
     /    |    \
PyTorch--NLP--ComputerVision
    |     |      |
    |     |      |
Backend--Data--DevOps
    |     |      |
FastAPI Pandas Docker
    |     |      |
    └─ Cloud ──┘
        AWS
```

### Data Structure
```typescript
{
  id: "pytorch",
  name: "PyTorch",
  category: "ML",
  level: "experienced",
  relatedTo: ["tensorflow", "scikit-learn", "huggingface"],
  tools: ["torchvision", "ONNX", "TensorBoard"]
}
```

### Categories
1. **ML/DL** (cyan)
   - PyTorch, TensorFlow, scikit-learn
   - Keras, HuggingFace Transformers
   - XGBoost, LightGBM

2. **Backend** (blue)
   - FastAPI, Flask
   - Node.js, Express
   - REST APIs, WebSocket

3. **Data** (green)
   - Pandas, NumPy
   - SQL (PostgreSQL)
   - InfluxDB (time-series)

4. **DevOps** (orange)
   - Docker, Docker Compose
   - Git, GitHub Actions
   - Linux, Bash

5. **Cloud** (purple)
   - AWS (EC2, S3, Lambda - learning)
   - Vercel, Railway
   - GCP (exploring)

### Interaction
- **Hover on node**: Show tooltip with tools and level
- **Click on node**: Highlight connected nodes
- **Filter by category**: Show only that category
- **Mobile**: Touch to expand, no hover

### Visual Design
```css
.skill-node {
  background: radial-gradient(circle, rgba(0,217,255,0.3), transparent);
  border: 2px solid rgba(0,217,255,0.6);
  border-radius: 50%;
  cursor: pointer;
}

.skill-node:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(0,217,255,0.6);
}

.skill-connection {
  stroke: rgba(100,116,139,0.3);
  stroke-width: 1px;
}
```

### Implementation
**Library**: React Flow veya D3.js veya custom Canvas

---

## 5. ROADMAP

### Amaç
Intentional growth göstermek. "Where I'm going" clarity.

### Timeline Layout (Horizontal)
```
NOW ─────► 6M ─────► 1Y ─────► 2Y
 │          │         │         │
 │          │         │         │
```

### Milestones

#### Now (December 2025)
```
Title: "Foundation Building"
Focus:
  - Complete Computer Engineering degree (May 2026)
  - Master PyTorch and Transformers in depth
  - Ship 2 production-ready AI projects
  - Build this portfolio with AI assistant

Skills to Develop:
  - Advanced NLP (LLMs, RAG systems)
  - MLOps basics (Docker, CI/CD)
  - System design fundamentals

Status: ✅ In Progress
```

#### 6 Months (June 2026)
```
Title: "First AI Engineer Role"
Focus:
  - Land AI/ML Engineer position (startup or mid-size)
  - Contribute to production ML systems
  - Learn from senior engineers
  - Ship features, not just experiments

Skills to Develop:
  - Production ML (monitoring, A/B testing)
  - Scalability (distributed training)
  - Cross-functional collaboration

Status: 🎯 Target
```

#### 1 Year (December 2026)
```
Title: "Production ML Competence"
Focus:
  - Own an ML feature end-to-end
  - Mentor junior engineers / interns
  - Deep dive into MLOps
  - Contribute to open source ML projects

Skills to Develop:
  - ML infrastructure (Kubeflow, MLflow)
  - Model optimization (quantization, pruning)
  - Technical writing (blog, papers)

Status: 📅 Planned
```

#### 2 Years (December 2027)
```
Title: "Senior Track or Specialization"
Focus:
  - Decision point: Generalist (Senior ML Eng) or Specialist (NLP/CV)
  - Lead projects, not just contribute
  - Influence technical decisions
  - Possibly start side project / startup

Potential Paths:
  A) Senior ML Engineer at tech company
  B) AI Research Engineer (if pursuing MS)
  C) Founding AI Engineer at startup

Status: 🔮 Exploring
```

### Visual Design
```css
.roadmap-timeline {
  position: relative;
  display: flex;
  gap: 80px;
}

.roadmap-line {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #0ea5e9, #00d9ff);
}

.roadmap-milestone {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.05);
  padding: 32px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.roadmap-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00d9ff;
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
}
```

---

## 6. AI ASSISTANT PLACEHOLDER

### Phase 1: Visual Placeholder
```
┌────────────────────────────────┐
│                                │
│   💬 AI Assistant              │
│                                │
│   "Coming Soon"                │
│                                │
│   I'm training an AI to answer │
│   questions about my projects, │
│   skills, and experience.      │
│                                │
│   [Notify Me When Live]        │
│                                │
└────────────────────────────────┘
```

### Phase 3: Full Implementation

#### Chat UI (Bottom Right Corner)
```
┌─────────────────────────┐
│  🤖 Ask me anything     │
├─────────────────────────┤
│                         │
│  User: What ML         │
│  frameworks do you use? │
│                         │
│  Assistant: I primarily │
│  work with PyTorch...   │
│                         │
├─────────────────────────┤
│  [Type message...]      │
└─────────────────────────┘
```

#### AI Assistant Personality

**Name**: "Duran's AI"

**Tone**:
- Technical but clear
- Confident but honest
- Friendly but professional
- No buzzwords or hype

**Example Q&A**:

```
Q: "What's your experience with deep learning?"

Good Response:
"I've worked with PyTorch for 1.5 years, primarily on NLP and time-series
projects. Most comfortable with Transformers (BERT, GPT architecture).
Currently learning about efficient fine-tuning (LoRA, QLoRA). I'm NOT
an expert in computer vision yet - that's on my roadmap."

Bad Response:
"I'm a deep learning expert with extensive experience in all neural
network architectures!" ❌ (Fake, over-promising)
```

```
Q: "Can you build production ML systems?"

Good Response:
"I've built end-to-end prototypes and deployed to staging environments.
I understand the full lifecycle: data → training → deployment → monitoring.
What I'm still learning: large-scale distributed training, advanced MLOps,
and production debugging at scale. I'm an early-career engineer, not
senior, but I think like one."

Bad Response:
"Yes, I can build anything!" ❌ (Not credible)
```

```
Q: "What's your biggest weakness?"

Good Response:
"Honestly? I sometimes over-engineer solutions when a simpler approach
works. I'm learning to start simple and add complexity only when needed.
Also, my system design knowledge is still developing - I can design ML
pipelines but need to level up on distributed systems architecture."

Bad Response:
"I'm a perfectionist!" ❌ (Cliché, not real)
```

#### Behavioral Rules
```python
class AssistantRules:
    MUST:
        - Only answer based on CV, projects, skills data
        - Admit when data is missing
        - Be technically specific
        - Differentiate "done" vs "learning"
        
    MUST NOT:
        - Hallucinate experience
        - Claim expertise not earned
        - Give generic motivational responses
        - Exaggerate abilities
```

---

## 7. DESIGN SYSTEM DETAYLARI

### Color Palette (Exact Values)
```css
/* Background */
--bg-primary: #0b0f14;
--bg-secondary: #1a1f2e;
--bg-tertiary: #252a38;

/* Accent */
--accent-cyan: #00d9ff;
--accent-blue: #0ea5e9;
--accent-purple: #8b5cf6;

/* Text */
--text-primary: #e2e8f0;
--text-secondary: #cbd5e1;
--text-muted: #64748b;

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-hover: rgba(255, 255, 255, 0.08);

/* Glow */
--glow-cyan: rgba(0, 217, 255, 0.4);
--glow-blue: rgba(14, 165, 233, 0.4);
```

### Component Library

#### Button Variants
```tsx
// Primary CTA
<Button variant="primary">
  background: linear-gradient(135deg, #0ea5e9, #00d9ff);
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 217, 255, 0.3);
  
  hover: {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 217, 255, 0.5);
  }
</Button>

// Secondary CTA
<Button variant="secondary">
  background: transparent;
  border: 2px solid rgba(0, 217, 255, 0.5);
  padding: 14px 30px;
  
  hover: {
    background: rgba(0, 217, 255, 0.1);
    border-color: #00d9ff;
  }
</Button>
```

#### Card Component
```tsx
<Card>
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px;
  
  hover: {
    border-color: rgba(0, 217, 255, 0.4);
    transform: translateY(-4px);
  }
</Card>
```

### Animation Specifications

#### Timing Functions
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
```

#### Duration Scale
```css
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-very-slow: 800ms;
```

#### Common Animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 217, 255, 0.6);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

### Responsive Breakpoints
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 8. COPY & CONTENT ÖRNEKLERİ

### Hero Headlines (3 Alternatif)

**Option 1: Engineering Focus**
```
DURAN GEZER
AI Engineer in Training

I don't just implement algorithms.
I engineer intelligent systems that solve real problems.

[Explore My Models] [Talk to AI Assistant]
```

**Option 2: Value Proposition**
```
DURAN GEZER
Building AI That Actually Works

From academic papers to production systems.
System thinker. Problem solver. Future-oriented.

[See My Work] [Query My Experience]
```

**Option 3: Identity Statement** (ÖNERİLEN)
```
DURAN GEZER
AI Engineer in Training

Engineering intelligence, not just implementing it.

I build systems that understand context, adapt to change,
and solve problems that matter.

[Explore Projects] [Talk to My AI]
```

### Section Headers

```
Projects → "Engineering Stories, Not Just Code"

Thinking → "How I Make Technical Decisions"

Skills → "Technical Depth Map"

Roadmap → "Where I'm Headed"
```

### Microcopy

#### Loading States
```
"Initializing neural pathways..."
"Compiling thoughts..."
"Training attention layers..."
```

#### Empty States
```
"No projects here yet. Check back soon."
"This section is evolving..."
```

#### Error States
```
"Something went wrong. Even AI makes mistakes."
"404: This page doesn't exist yet."
```

#### CTAs Throughout Site
```
"Explore case studies →"
"View source code ↗"
"See full thinking process →"
"Download resume (.pdf)"
"Connect on LinkedIn ↗"
"Check GitHub repos ↗"
```

### Footer Content
```
┌──────────────────────────────────────────────────┐
│                                                    │
│  DURAN GEZER                                       │
│  AI Engineer in Training                           │
│                                                    │
│  [GitHub] [LinkedIn] [Email] [Resume PDF]         │
│                                                    │
│  Built with Next.js, TypeScript, and attention    │
│  to detail. Deployed on Vercel.                   │
│                                                    │
│  © 2025 Duran Gezer. All rights reserved.         │
│                                                    │
│  Last updated: [Dynamic date]                     │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## 9. IMPLEMENTATION CHECKLIST

### Phase 1: Core Site (Week 1-6)

#### Week 1-2: Setup & Foundation
- [ ] Initialize Next.js 14 project
- [ ] Setup Tailwind CSS config
- [ ] Install Framer Motion
- [ ] Create design system components
  - [ ] Button
  - [ ] Card (glassmorphism)
  - [ ] Typography variants
- [ ] Setup data files structure
- [ ] Implement base layout (Header, Footer)

#### Week 3-4: Core Sections
- [ ] Hero section
  - [ ] Animated background
  - [ ] Hero content
  - [ ] CTAs
  - [ ] Scroll indicator
- [ ] Projects section
  - [ ] Project grid layout
  - [ ] Project cards
  - [ ] Project detail modal/page
  - [ ] Placeholder projects (4)
- [ ] Navigation
  - [ ] Smooth scroll
  - [ ] Active section indicator
  - [ ] Mobile menu

#### Week 5-6: Advanced Sections
- [ ] Engineering Thinking section
  - [ ] 6 thinking cards
  - [ ] Interactive hover states
- [ ] Skill Map
  - [ ] Network visualization
  - [ ] Interactive nodes
  - [ ] Category filtering
- [ ] Roadmap
  - [ ] Timeline layout
  - [ ] Milestone cards
- [ ] AI Assistant placeholder
  - [ ] Coming soon UI
  - [ ] Email capture form

#### Week 7: Polish & Optimization
- [ ] Responsive design (mobile, tablet)
- [ ] Animations refinement
- [ ] Performance optimization
  - [ ] Image optimization
  - [ ] Code splitting
  - [ ] Bundle size check
- [ ] SEO setup
  - [ ] Meta tags
  - [ ] Open Graph
  - [ ] Sitemap
- [ ] Analytics setup (Vercel Analytics)

### Phase 2: Content Population

- [ ] Replace placeholder projects with real projects
- [ ] Update skills with accurate data
- [ ] Add real contact information
- [ ] Write professional bio
- [ ] Add project screenshots/demos
- [ ] Update resume PDF

### Phase 3: AI Assistant Integration

- [ ] Backend setup
  - [ ] FastAPI project
  - [ ] Vector database (Pinecone)
  - [ ] RAG pipeline
  - [ ] LLM integration (OpenAI/Claude)
- [ ] Data preparation
  - [ ] Extract CV data
  - [ ] Extract project details
  - [ ] Create embeddings
- [ ] Frontend integration
  - [ ] Chat UI component
  - [ ] API integration
  - [ ] Streaming responses
  - [ ] Chat history
- [ ] Testing & refinement
  - [ ] Response quality testing
  - [ ] Personality tuning
  - [ ] Rate limiting
- [ ] Deployment
  - [ ] Backend deployment (Railway/Render)
  - [ ] Environment variables
  - [ ] Domain configuration

---

## 10. SUCCESS METRICS

### Pre-Launch
- [ ] Lighthouse score > 95
- [ ] Mobile responsive (tested on 3+ devices)
- [ ] All animations smooth (60fps)
- [ ] Load time < 2s
- [ ] Zero console errors

### Post-Launch (Track with Analytics)
- Average time on site > 3 minutes
- Project detail view rate > 40%
- Contact/LinkedIn click rate
- Recruiter feedback (qualitative)

### Phase 3 (AI Assistant)
- Chat engagement rate
- Average conversation length
- Positive feedback rate
- Questions answered vs "I don't know" rate

---

## BLUEPRINT TAMAMLANDI ✅

Bu dokümanda:
- ✅ Tüm section'ların detaylı tasarımı
- ✅ 4 realistic placeholder project
- ✅ Engineering thinking content (6 cards)
- ✅ Skill map yapısı
- ✅ Roadmap timeline
- ✅ AI assistant personality ve rules
- ✅ Design system (colors, typography, animations)
- ✅ Copy ve content örnekleri
- ✅ Implementation checklist

**Bir sonraki adım**: Next.js projesi initialize et ve development'a başla!
