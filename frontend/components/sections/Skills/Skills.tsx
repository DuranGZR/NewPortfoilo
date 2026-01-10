"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SectionReveal from '@/components/animations/SectionReveal';
import AnimatedCounter from '@/components/widgets/AnimatedCounter';
import {
  Brain, Code, Wrench, BarChart3,
  FlaskConical, Cpu, Database, Eye, MessageSquare, Network,
  Coffee, Hash, Zap, Circle, Layers,
  Rocket, Camera, GitBranch,
  TrendingUp, PieChart, Settings, Calculator, Bot,
  X, CheckCircle,
  LucideIcon
} from 'lucide-react';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface Skill {
  name: string;
  icon: LucideIcon;
  level: SkillLevel;
  description: string;
  learns: string[];
}

const levelOrder: Record<SkillLevel, number> = {
  expert: 0,
  advanced: 1,
  intermediate: 2,
  beginner: 3
};

const skillCategories = [
  {
    key: "ml",
    skills: [
      {
        name: "NumPy/Pandas",
        icon: Database,
        level: "advanced" as SkillLevel,
        description: "Veri manipülasyonu ve analiz için temel Python kütüphaneleri.",
        learns: [
          "DataFrame ve Series yapıları ile çalışma",
          "Veri temizleme ve ön işleme",
          "Gruplama, birleştirme ve pivot işlemleri",
          "Eksik veri yönetimi",
          "Vektörel işlemler ve performans optimizasyonu"
        ]
      },
      {
        name: "Scikit-learn",
        icon: FlaskConical,
        level: "intermediate" as SkillLevel,
        description: "Makine öğrenmesi modelleri için kapsamlı Python kütüphanesi.",
        learns: [
          "Sınıflandırma ve regresyon modelleri",
          "Model değerlendirme metrikleri (accuracy, F1, ROC)",
          "Cross-validation ve hyperparameter tuning",
          "Feature selection ve preprocessing",
          "Pipeline oluşturma"
        ]
      },
      {
        name: "TensorFlow/Keras",
        icon: Brain,
        level: "intermediate" as SkillLevel,
        description: "Derin öğrenme modelleri geliştirmek için framework.",
        learns: [
          "Sequential ve Functional API ile model oluşturma",
          "CNN ve Dense layer mimarileri",
          "Model eğitimi ve callback kullanımı",
          "Transfer learning temelleri",
          "Model kaydetme ve yükleme"
        ]
      },
      {
        name: "Computer Vision",
        icon: Eye,
        level: "beginner" as SkillLevel,
        description: "Görüntü işleme ve analiz teknikleri.",
        learns: [
          "OpenCV ile temel görüntü işleme",
          "Görüntü filtreleme ve dönüşümleri",
          "Nesne tespiti temelleri",
          "CNN tabanlı görüntü sınıflandırma"
        ]
      },
      {
        name: "NLP",
        icon: MessageSquare,
        level: "beginner" as SkillLevel,
        description: "Doğal dil işleme ve metin analizi.",
        learns: [
          "Metin ön işleme (tokenization, stemming)",
          "TF-IDF ve Bag of Words",
          "Sentiment analizi temelleri",
          "Word embeddings kavramı"
        ]
      },
      {
        name: "Deep Learning",
        icon: Network,
        level: "beginner" as SkillLevel,
        description: "Yapay sinir ağları ve derin öğrenme temelleri.",
        learns: [
          "Perceptron ve MLP mimarisi",
          "Backpropagation algoritması",
          "Aktivasyon fonksiyonları",
          "Overfitting ve regularization"
        ]
      }
    ].sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
  },
  {
    key: "programming",
    skills: [
      {
        name: "Python",
        icon: Code,
        level: "advanced" as SkillLevel,
        description: "Ana programlama dilim. Veri bilimi ve backend geliştirme için kullanıyorum.",
        learns: [
          "OOP prensipleri ve tasarım kalıpları",
          "Veri yapıları ve algoritmalar",
          "List comprehension ve generators",
          "Decorators ve context managers",
          "Async/await ve threading",
          "Virtual environments ve paket yönetimi"
        ]
      },
      {
        name: "Java",
        icon: Coffee,
        level: "intermediate" as SkillLevel,
        description: "Nesne yönelimli programlama ve Android geliştirme için.",
        learns: [
          "OOP prensipleri (inheritance, polymorphism)",
          "Collections framework",
          "Exception handling",
          "Swing ile GUI geliştirme",
          "Temel Android geliştirme"
        ]
      },
      {
        name: "C#",
        icon: Hash,
        level: "intermediate" as SkillLevel,
        description: "Windows masaüstü uygulamaları geliştirmek için.",
        learns: [
          "Windows Forms ile GUI",
          "OOP ve SOLID prensipleri",
          "LINQ sorguları",
          "Veritabanı bağlantısı (ADO.NET)",
          "Event-driven programlama"
        ]
      },
      {
        name: "SQL",
        icon: Database,
        level: "intermediate" as SkillLevel,
        description: "Veritabanı yönetimi ve sorgulama dili.",
        learns: [
          "SELECT, JOIN, GROUP BY sorguları",
          "Subquery ve CTE kullanımı",
          "Index ve performans optimizasyonu",
          "Veritabanı tasarımı ve normalizasyon",
          "CRUD işlemleri"
        ]
      },
      {
        name: "C/C++",
        icon: Zap,
        level: "beginner" as SkillLevel,
        description: "Düşük seviyeli programlama ve algoritma çalışmaları.",
        learns: [
          "Pointer ve memory yönetimi",
          "Temel veri yapıları implementasyonu",
          "Algoritma analizi",
          "Dosya işlemleri"
        ]
      },
      {
        name: "Kotlin",
        icon: Circle,
        level: "beginner" as SkillLevel,
        description: "Modern Android geliştirme için.",
        learns: [
          "Null safety özellikleri",
          "Data classes ve extension functions",
          "Coroutines temelleri",
          "Android UI geliştirme"
        ]
      }
    ].sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
  },
  {
    key: "frameworks",
    skills: [
      {
        name: "Git/GitHub",
        icon: GitBranch,
        level: "advanced" as SkillLevel,
        description: "Versiyon kontrol ve işbirliği için temel araç.",
        learns: [
          "Branch stratejileri ve merge/rebase",
          "Pull request ve code review süreci",
          "Conflict çözümleme",
          "Git flow ve conventional commits",
          "GitHub Actions temelleri"
        ]
      },
      {
        name: "FastAPI/Flask",
        icon: Rocket,
        level: "intermediate" as SkillLevel,
        description: "Python ile REST API geliştirme frameworkleri.",
        learns: [
          "RESTful API tasarımı",
          "Route ve endpoint oluşturma",
          "Request/Response handling",
          "Middleware ve dependency injection",
          "API dokümantasyonu (Swagger)"
        ]
      },
      {
        name: "OpenCV",
        icon: Camera,
        level: "intermediate" as SkillLevel,
        description: "Görüntü ve video işleme kütüphanesi.",
        learns: [
          "Görüntü okuma, yazma ve dönüştürme",
          "Renk uzayı dönüşümleri",
          "Edge detection ve filtering",
          "Kamera stream işleme",
          "Temel feature extraction"
        ]
      }
    ].sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
  },
  {
    key: "data",
    skills: [
      {
        name: "Data Analysis",
        icon: TrendingUp,
        level: "intermediate" as SkillLevel,
        description: "Veriden anlamlı içgörüler çıkarma süreci.",
        learns: [
          "Exploratory Data Analysis (EDA)",
          "İstatistiksel analiz ve hipotez testleri",
          "Korelasyon ve regresyon analizi",
          "Anomali tespiti",
          "Rapor ve dashboard oluşturma"
        ]
      },
      {
        name: "Data Visualization",
        icon: PieChart,
        level: "intermediate" as SkillLevel,
        description: "Veriyi görsel olarak anlaşılır hale getirme.",
        learns: [
          "Matplotlib ve Seaborn ile grafikler",
          "Plotly ile interaktif görselleştirme",
          "Grafik türü seçimi ve best practices",
          "Dashboard tasarımı temelleri"
        ]
      },
      {
        name: "Feature Engineering",
        icon: Settings,
        level: "intermediate" as SkillLevel,
        description: "ML modelleri için özellik oluşturma ve seçme.",
        learns: [
          "Feature extraction ve transformation",
          "Encoding teknikleri (one-hot, label)",
          "Feature scaling ve normalization",
          "Feature selection yöntemleri",
          "Domain knowledge ile özellik türetme"
        ]
      },
      {
        name: "Machine Learning",
        icon: Bot,
        level: "intermediate" as SkillLevel,
        description: "Makine öğrenmesi konseptleri ve uygulamaları.",
        learns: [
          "Supervised vs Unsupervised learning",
          "Model selection ve validation",
          "Bias-variance tradeoff",
          "Ensemble methods",
          "Model deployment temelleri"
        ]
      },
      {
        name: "Statistical Analysis",
        icon: Calculator,
        level: "beginner" as SkillLevel,
        description: "İstatistiksel yöntemler ve analiz teknikleri.",
        learns: [
          "Tanımlayıcı istatistikler",
          "Olasılık dağılımları",
          "Hipotez testleri temelleri",
          "Güven aralıkları"
        ]
      }
    ].sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
  }
];

const stats = [
  { labelKey: "technologies", value: "25", suffix: "+" },
  { labelKey: "projects", value: "12", suffix: "" },
  { labelKey: "codeLines", value: "50", suffix: "K+" },
  { labelKey: "learningHrs", value: "2000", suffix: "+" }
];

const levelColors = {
  beginner: 'bg-[#819fa7]/10 text-[#819fa7]/70 border-[#819fa7]/20',
  intermediate: 'bg-[#819fa7]/15 text-[#819fa7]/80 border-[#819fa7]/30',
  advanced: 'bg-[#819fa7]/20 text-[#819fa7]/90 border-[#819fa7]/40',
  expert: 'bg-[#819fa7]/30 text-[#819fa7] border-[#819fa7]/50'
};

function SkillCard({ skill, index, onClick }: { skill: Skill; index: number; onClick: () => void }) {
  const t = useTranslations('skills');
  const Icon = skill.icon;

  return (
    <motion.div
      className="group flex items-center justify-between p-3 rounded-xl bg-[#0d0d0d]/40 hover:bg-[#819fa7]/5 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-[#819fa7]" />
        <span className="text-sm text-[#f3f5f9]/80 group-hover:text-[#f3f5f9] transition-colors">
          {skill.name}
        </span>
      </div>
      <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${levelColors[skill.level]}`}>
        {t(`levels.${skill.level}`)}
      </span>
    </motion.div>
  );
}

function SkillModal({ skill, onClose }: { skill: Skill | null; onClose: () => void }) {
  const t = useTranslations('skills');

  if (!skill) return null;

  const Icon = skill.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-lg bg-[#1a1a1a] border border-[#819fa7]/20 rounded-2xl p-6 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#819fa7]/10 transition-colors"
          >
            <X className="w-5 h-5 text-[#819fa7]" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#819fa7]/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#819fa7]" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#f3f5f9]">{skill.name}</h3>
              <span className={`inline-block mt-1 px-2.5 py-1 text-[10px] font-medium rounded-full border ${levelColors[skill.level]}`}>
                {t(`levels.${skill.level}`)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#f3f5f9]/70 mb-6 leading-relaxed">
            {skill.description}
          </p>

          {/* Learnings */}
          <div>
            <h4 className="text-sm font-semibold text-[#819fa7] uppercase tracking-wider mb-4">
              {t('modal.whatIKnow')}
            </h4>
            <ul className="space-y-2">
              {skill.learns.map((learn, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-sm text-[#f3f5f9]/70"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle className="w-4 h-4 text-[#819fa7] mt-0.5 flex-shrink-0" />
                  <span>{learn}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Skills() {
  const t = useTranslations('skills');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="relative py-24 px-6 bg-[#0d0d0d]">
      {/* Simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[#819fa7] px-4 py-2 rounded-full border border-[#819fa7]/30 bg-[#819fa7]/5 mb-6">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#f3f5f9] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#f3f5f9]/50 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </SectionReveal>

        {/* Level Legend */}
        <SectionReveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {(['expert', 'advanced', 'intermediate', 'beginner'] as SkillLevel[]).map((level, index) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-[#819fa7]"
                  style={{ opacity: 1 - (index * 0.2) }}
                />
                <span className="text-xs text-[#f3f5f9]/50">{t(`levels.${level}`)}</span>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <SectionReveal
              key={category.key}
              delay={0.1 + categoryIndex * 0.1}
              direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
            >
              <div className="h-full p-6 rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-all duration-300">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#819fa7] to-[#5b6e74]" />
                  <h3 className="text-base font-display font-bold text-[#f3f5f9]">
                    {t(`categories.${category.key}`)}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  {category.skills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={index}
                      onClick={() => setSelectedSkill(skill)}
                    />
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <SectionReveal key={stat.labelKey} delay={0.4 + index * 0.08}>
              <div className="text-center p-5 rounded-xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="text-2xl md:text-3xl font-display font-bold text-[#819fa7] mb-1">
                  <AnimatedCounter value={stat.value + stat.suffix} duration={2000} />
                </div>
                <div className="text-xs text-[#f3f5f9]/40 uppercase tracking-wider">
                  {t(`stats.${stat.labelKey}`)}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedSkill && (
        <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}
    </section>
  );
}
