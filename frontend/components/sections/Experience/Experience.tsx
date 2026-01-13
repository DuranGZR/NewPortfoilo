"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, FileCheck, X, CheckCircle, Calendar, Building, BookOpen, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import SectionReveal from '@/components/animations/SectionReveal';

interface DetailItem {
  key: string;
  details: string[];
  isCourse?: boolean;
}

// Üniversite Dersleri
const coursesData: DetailItem[] = [
  {
    key: "dataStructures",
    isCourse: true,
    details: [
      "Array, Linked List, Stack, Queue veri yapıları",
      "Tree ve Graph yapıları",
      "Sorting ve Searching algoritmaları",
      "Big O notasyonu ve karmaşıklık analizi",
      "Recursive ve iterative problem çözme"
    ]
  },
  {
    key: "oop",
    isCourse: true,
    details: [
      "Sınıf ve nesne kavramları",
      "Inheritance, Polymorphism, Encapsulation",
      "Abstract class ve Interface",
      "Design patterns temelleri",
      "UML diyagramları"
    ]
  },
  {
    key: "database",
    isCourse: true,
    details: [
      "İlişkisel veritabanı tasarımı",
      "SQL sorguları (SELECT, JOIN, GROUP BY)",
      "Normalizasyon (1NF, 2NF, 3NF)",
      "ER diyagramları",
      "Transaction ve ACID prensipleri"
    ]
  },
  {
    key: "algorithms",
    isCourse: true,
    details: [
      "Divide and Conquer stratejisi",
      "Dynamic Programming",
      "Greedy algoritmaları",
      "Graph algoritmaları (BFS, DFS, Dijkstra)",
      "Algoritma karmaşıklık analizi"
    ]
  },
  {
    key: "ai",
    isCourse: true,
    details: [
      "Arama algoritmaları (A*, BFS, DFS)",
      "Oyun teorisi ve minimax",
      "Makine öğrenmesi temelleri",
      "Karar ağaçları",
      "Yapay sinir ağları giriş"
    ]
  },
  {
    key: "imageProcessing",
    isCourse: true,
    details: [
      "Görüntü filtreleme teknikleri",
      "Edge detection algoritmaları",
      "Histogram işlemleri",
      "Morfolojik operasyonlar",
      "Renk uzayları ve dönüşümleri"
    ]
  },
  {
    key: "computerNetworks",
    isCourse: true,
    details: [
      "OSI ve TCP/IP modelleri",
      "IP adresleme ve subnetting",
      "Routing protokolleri",
      "Socket programlama",
      "Network güvenliği temelleri"
    ]
  },
  {
    key: "webProgramming",
    isCourse: true,
    details: [
      "HTML, CSS, JavaScript temelleri",
      "Backend geliştirme (PHP/Node.js)",
      "REST API tasarımı",
      "Veritabanı entegrasyonu",
      "Session ve authentication"
    ]
  },
  {
    key: "programmingLanguages",
    isCourse: true,
    details: [
      "Programlama paradigmaları",
      "Syntax ve semantik analiz",
      "Compiler ve interpreter farkları",
      "Memory yönetimi",
      "Fonksiyonel programlama kavramları"
    ]
  },
  {
    key: "softwareEng",
    isCourse: true,
    details: [
      "Yazılım geliştirme yaşam döngüsü",
      "Agile ve Scrum metodolojileri",
      "Gereksinim analizi",
      "Test stratejileri",
      "Versiyon kontrol sistemleri"
    ]
  }
];

// Eğitim verisi
const educationData = {
  degree: {
    key: "degree",
    details: [
      "Veri yapıları ve algoritmalar",
      "Nesne yönelimli programlama",
      "Veritabanı yönetim sistemleri",
      "Yapay zeka ve görüntü işleme",
      "Bilgisayar ağları",
      "Yazılım mühendisliği prensipleri"
    ]
  },
  courses: coursesData
};

// Sertifikalar
const certificationsData: DetailItem[] = [
  {
    key: "mlCamp",
    details: [
      "End-to-end makine öğrenmesi pipeline'ı",
      "Feature engineering teknikleri",
      "Model seçimi ve değerlendirme",
      "Gerçek verilerle proje geliştirme",
      "Takım çalışması ve sunum"
    ]
  },
  {
    key: "featureEng",
    details: [
      "Encoding teknikleri (Label, One-Hot, Target)",
      "Feature scaling ve normalization",
      "Missing value handling stratejileri",
      "Outlier detection ve treatment",
      "Feature extraction yöntemleri"
    ]
  },
  {
    key: "machineLearning",
    details: [
      "Supervised learning algoritmaları",
      "Unsupervised learning teknikleri",
      "Model validation ve cross-validation",
      "Hyperparameter tuning",
      "Ensemble methods"
    ]
  },
  {
    key: "pythonDS",
    details: [
      "NumPy ve Pandas ile veri manipülasyonu",
      "Matplotlib ve Seaborn ile görselleştirme",
      "Veri temizleme ve ön işleme",
      "Exploratory Data Analysis",
      "Python programlama best practices"
    ]
  },
  {
    key: "csharp",
    details: [
      "C# syntax ve veri türleri",
      "OOP prensipleri (inheritance, polymorphism)",
      "Windows Forms ile GUI geliştirme",
      "Exception handling",
      "LINQ ve collections"
    ]
  },
  {
    key: "cloudNight",
    details: [
      "Cloud computing temelleri",
      "Huawei Cloud servisleri",
      "Sanal sunucu yönetimi",
      "Cloud storage ve networking",
      "DevOps pratikleri"
    ]
  }
];

// Topluluk Aktiviteleri
const communityData: DetailItem[] = [
  {
    key: "hsdDevOps",
    details: [
      "CI/CD pipeline tasarımı ve implementasyonu",
      "Docker container yönetimi ve orchestration",
      "GitHub Actions ile otomasyon workflow'ları",
      "Linux sunucu yönetimi ve güvenliği",
      "DevOps kültürü ve best practice'leri uygulama",
      "Topluluk projelerinde teknik altyapı kurulumu"
    ]
  },
  {
    key: "cyberSecurityOrg",
    details: [
      "Topluluk etkinlikleri planlama ve yürütme",
      "Siber güvenlik eğitim programları organize etme",
      "15+ kişilik ekibi yönetme ve koordinasyon",
      "Sponsor ve paydaş ilişkileri yönetimi",
      "Siber güvenlik farkındalığı kampanyaları",
      "Liderlik ve iletişim becerilerini geliştirme"
    ]
  }
];

function DetailModal({
  item,
  onClose,
  t,
  isCourse = false
}: {
  item: DetailItem | null;
  onClose: () => void;
  t: (key: string) => string;
  isCourse?: boolean;
}) {
  if (!item) return null;

  const prefix = isCourse ? 'courses' : 'items';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
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
          className="relative w-full max-w-lg bg-[#1a1a1a] border border-[#819fa7]/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 rounded-lg hover:bg-[#819fa7]/10 transition-colors"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-[#819fa7]" />
          </button>

          {/* Header */}
          <div className="mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              {isCourse && <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-[#819fa7]" />}
              <h3 className="text-lg md:text-xl font-display font-bold text-[#f3f5f9]">
                {t(`${prefix}.${item.key}.title`)}
              </h3>
            </div>
            {!isCourse && (
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-sm">
                <span className="flex items-center gap-1.5 text-[#819fa7]">
                  <Building className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {t(`${prefix}.${item.key}.organization`)}
                </span>
                <span className="flex items-center gap-1.5 text-[#f3f5f9]/50">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {t(`${prefix}.${item.key}.period`)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-[#f3f5f9]/70 mb-4 md:mb-6 leading-relaxed">
            {t(`${prefix}.${item.key}.description`)}
          </p>

          {/* Learnings */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-[#819fa7] uppercase tracking-wider mb-3 md:mb-4">
              {t('modal.learned')}
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              {item.details.map((detail, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-[#f3f5f9]/70"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#819fa7] mt-0.5 flex-shrink-0" />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Tab types for mobile
type MobileTab = 'education' | 'certifications' | 'community';

export default function Experience() {
  const t = useTranslations('experience');
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [isCourseModal, setIsCourseModal] = useState(false);
  const [activeTab, setActiveTab] = useState<MobileTab>('education');

  const handleItemClick = (item: DetailItem, isCourse: boolean = false) => {
    setSelectedItem(item);
    setIsCourseModal(isCourse);
  };

  const tabs = [
    { key: 'education' as MobileTab, icon: GraduationCap, label: t('categories.education') },
    { key: 'certifications' as MobileTab, icon: FileCheck, label: t('categories.certifications') },
    { key: 'community' as MobileTab, icon: Users, label: t('categories.community') },
  ];

  return (
    <section id="experience" className="relative py-12 md:py-24 px-4 md:px-6 bg-[#0d0d0d]">
      {/* Simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="text-center mb-6 md:mb-16">
          <span className="inline-block text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#819fa7] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#819fa7]/30 bg-[#819fa7]/5 mb-3 md:mb-6">
            {t('badge')}
          </span>
          <h2 className="text-xl md:text-4xl lg:text-5xl font-display font-bold text-[#f3f5f9] mb-2 md:mb-4">
            {t('title')}
          </h2>
          <p className="text-xs md:text-base text-[#f3f5f9]/50 max-w-xl mx-auto hidden md:block">
            {t('subtitle')}
          </p>
        </SectionReveal>

        {/* ===== MOBILE LAYOUT - Tab Style ===== */}
        <div className="md:hidden">
          {/* Tab Buttons */}
          <div className="flex gap-1 p-1 rounded-xl bg-[#1a1a1a]/50 mb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-[#819fa7]/20 text-[#f3f5f9]'
                      : 'text-[#f3f5f9]/50 hover:text-[#f3f5f9]/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-[280px]"
            >
              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-3">
                  {/* Degree Card */}
                  <motion.div
                    className="p-4 rounded-xl bg-[#1a1a1a]/60 border border-[#819fa7]/15 cursor-pointer active:scale-[0.99] transition-transform"
                    onClick={() => handleItemClick(educationData.degree)}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-semibold text-[#f3f5f9]">
                        {t('items.degree.title')}
                      </h4>
                      <span className="text-xs text-[#819fa7] font-mono">
                        {t('items.degree.period')}
                      </span>
                    </div>
                    <p className="text-sm text-[#819fa7] mb-1">{t('items.degree.organization')}</p>
                    <p className="text-sm text-[#f3f5f9]/60">{t('items.degree.description')}</p>
                  </motion.div>

                  {/* Courses Grid */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#819fa7] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {t('coursesTitle')}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {educationData.courses.slice(0, 6).map((course) => (
                        <motion.button
                          key={course.key}
                          className="p-2 rounded-lg bg-[#0d0d0d]/50 border border-[#819fa7]/10 text-xs text-[#f3f5f9]/70 text-left"
                          onClick={() => handleItemClick(course, true)}
                          whileTap={{ scale: 0.98 }}
                        >
                          {t(`courses.${course.key}.title`)}
                        </motion.button>
                      ))}
                    </div>
                    {educationData.courses.length > 6 && (
                      <p className="text-[10px] text-[#819fa7]/50 text-center mt-2">
                        +{educationData.courses.length - 6} ders daha
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Certifications Tab */}
              {activeTab === 'certifications' && (
                <div className="space-y-2">
                  {certificationsData.map((item) => (
                    <motion.div
                      key={item.key}
                      className="p-3 rounded-xl bg-[#1a1a1a]/60 border border-[#819fa7]/15 cursor-pointer active:scale-[0.99] transition-transform"
                      onClick={() => handleItemClick(item)}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-semibold text-[#f3f5f9]">
                          {t(`items.${item.key}.title`)}
                        </h4>
                        <span className="text-[10px] text-[#819fa7] font-mono">
                          {t(`items.${item.key}.period`)}
                        </span>
                      </div>
                      <p className="text-xs text-[#819fa7]">{t(`items.${item.key}.organization`)}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Community Tab */}
              {activeTab === 'community' && (
                <div className="space-y-3">
                  {communityData.map((item) => (
                    <motion.div
                      key={item.key}
                      className="p-4 rounded-xl bg-[#1a1a1a]/60 border border-[#819fa7]/15 cursor-pointer active:scale-[0.99] transition-transform"
                      onClick={() => handleItemClick(item)}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base font-semibold text-[#f3f5f9]">
                          {t(`items.${item.key}.title`)}
                        </h4>
                        <span className="text-xs text-[#819fa7] font-mono">
                          {t(`items.${item.key}.period`)}
                        </span>
                      </div>
                      <p className="text-sm text-[#819fa7] mb-1">{t(`items.${item.key}.organization`)}</p>
                      <p className="text-sm text-[#f3f5f9]/60">{t(`items.${item.key}.description`)}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ===== DESKTOP LAYOUT - Original Grid ===== */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

            {/* Education Section */}
            <SectionReveal delay={0.1} direction="left">
              <div className="h-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-colors">
                {/* Category Header */}
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#819fa7]/10 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-[#819fa7]" />
                  </div>
                  <h3 className="text-sm md:text-base font-display font-bold text-[#f3f5f9]">
                    {t('categories.education')}
                  </h3>
                </div>

                {/* Degree Info */}
                <motion.div
                  className="pl-3 md:pl-4 border-l-2 border-[#819fa7]/20 cursor-pointer hover:border-[#819fa7]/50 transition-colors mb-4 md:mb-6"
                  whileHover={{ x: 4 }}
                  onClick={() => handleItemClick(educationData.degree)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-xs md:text-sm font-semibold text-[#f3f5f9]">
                      {t('items.degree.title')}
                    </h4>
                    <span className="text-[10px] md:text-xs text-[#f3f5f9]/40 font-mono">
                      {t('items.degree.period')}
                    </span>
                  </div>
                  <p className="text-[10px] md:text-xs text-[#819fa7] mb-1">{t('items.degree.organization')}</p>
                  <p className="text-[10px] md:text-xs text-[#f3f5f9]/50">{t('items.degree.description')}</p>
                </motion.div>

                {/* Courses */}
                <div className="mt-3 md:mt-4">
                  <h4 className="text-[10px] md:text-xs font-semibold text-[#819fa7] uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                    <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {t('coursesTitle')}
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                    {educationData.courses.map((course) => (
                      <motion.div
                        key={course.key}
                        className="p-1.5 md:p-2 rounded-lg bg-[#0d0d0d]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/30 cursor-pointer transition-all text-[10px] md:text-xs text-[#f3f5f9]/70 hover:text-[#f3f5f9]"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleItemClick(course, true)}
                      >
                        {t(`courses.${course.key}.title`)}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Certifications Section */}
            <SectionReveal delay={0.2} direction="right">
              <div className="h-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-colors">
                {/* Category Header */}
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#819fa7]/10 flex items-center justify-center">
                    <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-[#819fa7]" />
                  </div>
                  <h3 className="text-sm md:text-base font-display font-bold text-[#f3f5f9]">
                    {t('categories.certifications')}
                  </h3>
                </div>

                {/* Certification Items */}
                <div className="space-y-3 md:space-y-4">
                  {certificationsData.map((item) => (
                    <motion.div
                      key={item.key}
                      className="pl-3 md:pl-4 border-l-2 border-[#819fa7]/20 cursor-pointer hover:border-[#819fa7]/50 transition-colors"
                      whileHover={{ x: 4 }}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-xs md:text-sm font-semibold text-[#f3f5f9]">
                          {t(`items.${item.key}.title`)}
                        </h4>
                        <span className="text-[10px] md:text-xs text-[#f3f5f9]/40 font-mono">
                          {t(`items.${item.key}.period`)}
                        </span>
                      </div>
                      <p className="text-[10px] md:text-xs text-[#819fa7] mb-1">{t(`items.${item.key}.organization`)}</p>
                      <p className="text-[10px] md:text-xs text-[#f3f5f9]/50">{t(`items.${item.key}.description`)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Community Activities Section - Full Width */}
          <SectionReveal delay={0.3} className="mt-4 md:mt-6">
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-colors">
              {/* Category Header */}
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#819fa7]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-[#819fa7]" />
                </div>
                <h3 className="text-sm md:text-base font-display font-bold text-[#f3f5f9]">
                  {t('categories.community')}
                </h3>
              </div>

              {/* Community Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {communityData.map((item) => (
                  <motion.div
                    key={item.key}
                    className="pl-3 md:pl-4 border-l-2 border-[#819fa7]/20 cursor-pointer hover:border-[#819fa7]/50 transition-colors"
                    whileHover={{ x: 4 }}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-xs md:text-sm font-semibold text-[#f3f5f9]">
                        {t(`items.${item.key}.title`)}
                      </h4>
                      <span className="text-[10px] md:text-xs text-[#f3f5f9]/40 font-mono">
                        {t(`items.${item.key}.period`)}
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs text-[#819fa7] mb-1">{t(`items.${item.key}.organization`)}</p>
                    <p className="text-[10px] md:text-xs text-[#f3f5f9]/50 line-clamp-2">{t(`items.${item.key}.description`)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          t={t}
          isCourse={isCourseModal}
        />
      )}
    </section>
  );
}
