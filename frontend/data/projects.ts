// Proje Verileri - Duran Gezer'in GitHub Projeleri (Türkçe)

export interface Project {
  id: string
  title: string
  status: 'completed' | 'in-progress' | 'planned'
  oneLiner: string

  problem: string
  constraints: string[]
  approach: string

  modelChoice: {
    name: string
    rationale: string
  }

  evaluation: {
    metrics: Array<{
      name: string
      value: string
    }>
    approach: string
  }

  outcome: string
  learnings: string[]

  techStack: string[]
  github?: string
  demo?: string

  thumbnail: string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 'visual-ai',
    title: 'Gerçek Zamanlı Görsel Anlama AI',
    status: 'completed',
    oneLiner: 'Kamera görüntüsünü anlık olarak analiz eden ve Türkçe açıklama üreten yapay zeka sistemi.',

    problem: 'Görme engelli bireyler veya anlık çevre analizi ihtiyacı olanlar için gerçek zamanlı görsel açıklama sistemi gerekiyor. Mevcut çözümler ya çok yavaş ya da Türkçe desteklemiyor.',

    constraints: [
      'Düşük gecikme süresi gereksinimi (<2 saniye)',
      'Türkçe dil desteği zorunluluğu',
      'Lokal çalışabilme (internet bağımsız, gizlilik)',
      'Farklı ışık koşullarında güvenilir çalışma'
    ],

    approach: 'Ollama üzerinde LLaVA vision-language modeli kullanarak gerçek zamanlı görüntü analizi. OpenCV ile kamera entegrasyonu sağlandı. Görüntü ön işleme ile model performansı optimize edildi.',

    modelChoice: {
      name: 'LLaVA (Ollama)',
      rationale: 'Lokal çalışabilme özelliği sayesinde internet bağımsızlığı ve gizlilik sağlıyor. Türkçe dil desteği mevcut. API maliyeti yok ve açık kaynak olması geliştirmeyi kolaylaştırıyor.'
    },

    evaluation: {
      metrics: [
        { name: 'Yanıt Süresi', value: '<2s' },
        { name: 'Doğruluk', value: '%85+' },
        { name: 'Dil Desteği', value: 'TR/EN' }
      ],
      approach: 'Farklı ortam ve nesnelerle manuel test yapıldı. 100+ farklı sahne üzerinde doğruluk ölçümü gerçekleştirildi.'
    },

    outcome: 'Başarıyla çalışan gerçek zamanlı görsel anlama sistemi geliştirildi. Sesli çıktı özelliği eklenebilir durumda. Görme engelli bireylere yardımcı olabilecek potansiyele sahip.',

    learnings: [
      'Vision-language modelleri hızla gelişiyor ve lokal kullanıma uygun hale geliyor',
      'Lokal LLM performansı birçok kullanım senaryosu için yeterli olabiliyor',
      'Prompt engineering, model çıktı kalitesini dramatik şekilde etkiliyor',
      'Türkçe için ek prompt optimizasyonu daha iyi sonuçlar veriyor'
    ],

    techStack: ['Python', 'Ollama', 'LLaVA', 'OpenCV'],

    github: 'https://github.com/DuranGZR/Real-Time-Visual-Understanding',
    demo: undefined,

    thumbnail: '/projects/visual-ai.jpg',
    tags: ['AI', 'Computer Vision', 'LLM', 'Python']
  },

  {
    id: 'handwriting',
    title: 'El Yazısı Rakam Tanıma',
    status: 'completed',
    oneLiner: 'CNN kullanarak el yazısıyla yazılmış rakamları yüksek doğrulukla tanıyan derin öğrenme modeli.',

    problem: 'El yazısı dijitalleştirme ve otomatik form işleme için güvenilir rakam tanıma sistemi gerekiyor. Farklı el yazısı stillerini doğru tanımlayabilmeli.',

    constraints: [
      'Farklı el yazısı stillerini tanıyabilme',
      'Yüksek doğruluk oranı gereksinimi (%95+)',
      'Hızlı inference süresi (<50ms)',
      'MNIST veri seti ile uyumluluk'
    ],

    approach: 'Convolutional Neural Network (CNN) mimarisi ile görüntü sınıflandırma. Veri artırma (data augmentation) teknikleri ile modelin genelleme yeteneği güçlendirildi.',

    modelChoice: {
      name: 'CNN (TensorFlow/Keras)',
      rationale: 'Görüntü sınıflandırma için standart ve kanıtlanmış mimari. Basit ama güçlü performans. Eğitim ve deploy süreçleri iyi dokümante edilmiş.'
    },

    evaluation: {
      metrics: [
        { name: 'Test Doğruluğu', value: '%98+' },
        { name: 'Model Boyutu', value: '<5MB' },
        { name: 'Inference', value: '<50ms' }
      ],
      approach: 'MNIST test seti ve özel toplanmış el yazısı örnekleri üzerinde değerlendirme yapıldı.'
    },

    outcome: 'Yüksek doğrulukla çalışan rakam tanıma modeli geliştirildi. Kullanıcı dostu GUI arayüzü ile entegre edildi.',

    learnings: [
      'CNN temelleri, derin öğrenme için kritik bir başlangıç noktası',
      'Data augmentation, sınırlı veriyle bile genellemeyi önemli ölçüde artırıyor',
      'Basit problemler için basit çözümler genellikle en etkili oluyor',
      'Transfer learning her zaman gerekli değil, özellikle yeterli veri varsa'
    ],

    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],

    github: 'https://github.com/DuranGZR/El_Yazisi_Tahmin',
    demo: undefined,

    thumbnail: '/projects/handwriting.jpg',
    tags: ['Deep Learning', 'CNN', 'Image Classification']
  },

  {
    id: 'diabetes',
    title: 'Diyabet Tahmin Sistemi',
    status: 'completed',
    oneLiner: 'Makine öğrenmesi ile diyabet risk tahminlemesi yapan sınıflandırma modeli.',

    problem: 'Erken teşhis için diyabet risk faktörlerini analiz eden bir sistem gerekli. Sağlık verilerinden anlamlı tahminler üretebilmeli.',

    constraints: [
      'Sınırlı veri seti (Pima Indians Diabetes Dataset)',
      'Dengesiz sınıf dağılımı problemi',
      'Tıbbi alanda yüksek precision gereksinimi',
      'Yorumlanabilirlik önemli (kara kutu model yetersiz)'
    ],

    approach: 'Çeşitli ML algoritmalarının karşılaştırmalı analizi yapıldı. Kapsamlı feature engineering ve veri ön işleme uygulandı. Ensemble yöntemler ile en iyi sonuç elde edildi.',

    modelChoice: {
      name: 'Random Forest / XGBoost',
      rationale: 'Ensemble yöntemler daha iyi genelleme sağlıyor. Feature importance analizi ile hangi faktörlerin etkili olduğu yorumlanabiliyor.'
    },

    evaluation: {
      metrics: [
        { name: 'Accuracy', value: '%82' },
        { name: 'F1-Score', value: '0.78' },
        { name: 'AUC-ROC', value: '0.85' }
      ],
      approach: 'K-fold cross-validation ve confusion matrix analizi ile model performansı değerlendirildi.'
    },

    outcome: 'Tıbbi karar destek sistemi prototipi geliştirildi. Feature importance analizi ile en etkili risk faktörleri belirlendi.',

    learnings: [
      'Tıbbi verilerde precision çok kritik - yanlış pozitifler ciddi sonuçlar doğurabilir',
      'Feature engineering, ham veriden çok daha iyi sonuçlar alınmasını sağlıyor',
      'Ensemble yöntemler genellikle tek modellere göre daha güçlü',
      'Veri kalitesi, model karmaşıklığından daha önemli'
    ],

    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],

    github: 'https://github.com/DuranGZR/Diabetes_Prediction',
    demo: undefined,

    thumbnail: '/projects/diabetes.jpg',
    tags: ['Machine Learning', 'Classification', 'Healthcare']
  },

  {
    id: 'xox-bot',
    title: 'XOX Bot (Q-Learning AI)',
    status: 'completed',
    oneLiner: 'Pekiştirmeli öğrenme ile kendini eğiten ve optimal strateji geliştiren tic-tac-toe oyuncu yapay zekası.',

    problem: 'Klasik oyunlarda yapay zekanın strateji öğrenme ve optimal hamle bulma sürecini anlamak ve uygulamak.',

    constraints: [
      'Oyun kurallarına tam uyum',
      'Öğrenme hızı optimizasyonu',
      'Exploration vs exploitation dengesi',
      'Farklı rakip stratejilerine adaptasyon'
    ],

    approach: 'Q-Learning algoritması ile pekiştirmeli öğrenme uygulandı. Epsilon-greedy strateji ile keşif ve kullanım dengesi sağlandı.',

    modelChoice: {
      name: 'Q-Learning',
      rationale: 'Basit ama etkili bir pekiştirmeli öğrenme algoritması. Discrete state-action space için ideal. Öğrenme sürecini gözlemlemeye uygun.'
    },

    evaluation: {
      metrics: [
        { name: 'Kazanma Oranı', value: '%95+' },
        { name: 'Eğitim Süresi', value: '<1dk' },
        { name: 'Optimal Hamleler', value: '%90+' }
      ],
      approach: 'Random ve optimal rakiplere karşı binlerce oyun ile test edildi.'
    },

    outcome: 'Neredeyse yenilmez XOX oyuncusu geliştirildi. Reinforcement learning temellerini anlamak için mükemmel bir uygulama projesi oldu.',

    learnings: [
      'RL temelleri en iyi pratik uygulama ile öğreniliyor',
      'Hyperparameter tuning (learning rate, epsilon decay) sonucu dramatik etkiliyor',
      'Basit oyunlar RL algoritmaları için ideal test ortamı',
      'Convergence garantisi için dikkatli tasarım gerekiyor'
    ],

    techStack: ['Python', 'NumPy', 'Q-Learning'],

    github: 'https://github.com/DuranGZR/XOX_Bot',
    demo: undefined,

    thumbnail: '/projects/xox-bot.jpg',
    tags: ['Reinforcement Learning', 'Q-Learning', 'Game AI']
  },

  {
    id: 'salary-prediction',
    title: 'Maaş Tahmin Modeli',
    status: 'completed',
    oneLiner: 'Kapsamlı feature engineering ve makine öğrenmesi ile çalışan maaş tahmini yapan regresyon modeli.',

    problem: 'İK ve işe alım süreçlerinde adil ve veri odaklı maaş belirleme için tahmin sistemi gerekiyor.',

    constraints: [
      'Çok sayıda kategorik değişken yönetimi',
      'Eksik verilerle başa çıkma stratejileri',
      'Non-linear ilişkilerin modellenmesi',
      'Outlier (aykırı değer) yönetimi'
    ],

    approach: 'Kapsamlı EDA (Exploratory Data Analysis) yapıldı. Feature engineering ile yeni özellikler türetildi. Farklı modeller karşılaştırıldı. Pipeline ile end-to-end çözüm geliştirildi.',

    modelChoice: {
      name: 'Gradient Boosting / Random Forest',
      rationale: 'Regresyon problemlerinde güçlü performans. Feature importance ile hangi faktörlerin maaşı etkilediği yorumlanabilir.'
    },

    evaluation: {
      metrics: [
        { name: 'R² Score', value: '0.85' },
        { name: 'MAE', value: '±%8' },
        { name: 'RMSE', value: 'Düşük' }
      ],
      approach: 'Train-test split ve cross-validation ile model performansı değerlendirildi.'
    },

    outcome: 'Maaş tahmini için kullanılabilir model geliştirildi. Maaşı en çok etkileyen faktörler (deneyim, pozisyon, sektör vb.) belirlendi.',

    learnings: [
      'Feature engineering, model performansını dramatik şekilde artırabiliyor',
      'Kategorik değişkenlerin encoding stratejisi çok önemli',
      'Domain knowledge (sektör bilgisi) feature engineering\'i yönlendirmeli',
      'Pipeline kullanımı temiz ve bakımı kolay kod sağlıyor'
    ],

    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Feature Engineering'],

    github: 'https://github.com/DuranGZR/Salary_Prediction_with_Mahcine_Learning',
    demo: undefined,

    thumbnail: '/projects/salary.jpg',
    tags: ['Machine Learning', 'Regression', 'Feature Engineering']
  },

  {
    id: 'neuron',
    title: 'Basit Yapay Sinir Ağı',
    status: 'completed',
    oneLiner: 'Sıfırdan NumPy ile yazılmış, temel yapay nöron ve neural network implementasyonu.',

    problem: 'Yapay sinir ağlarının temel çalışma prensiplerini derinlemesine anlamak ve framework kullanmadan uygulamak.',

    constraints: [
      'Sadece NumPy kullanımı (TensorFlow/PyTorch yok)',
      'Matematiksel temelleri tam anlama',
      'Forward ve backward propagation implementasyonu',
      'Gradient descent optimizasyonu'
    ],

    approach: 'Perceptron ve basit multi-layer neural network sıfırdan kodlandı. Aktivasyon fonksiyonları, loss hesaplama ve backpropagation elle implemente edildi.',

    modelChoice: {
      name: 'Perceptron / MLP',
      rationale: 'En temel neural network yapısı. Öğrenim için ideal başlangıç noktası. Matematiği anlamak framework kullanmadan önce kritik.'
    },

    evaluation: {
      metrics: [
        { name: 'AND/OR Gates', value: '%100' },
        { name: 'XOR (MLP)', value: '%100' },
        { name: 'Öğrenim Değeri', value: 'Yüksek' }
      ],
      approach: 'Boolean logic gates (AND, OR, XOR) problemleri ile test edildi.'
    },

    outcome: 'Neural network temellerini derinlemesine anlama sağlandı. Framework kullanmadan önce bu bilgi kritik öneme sahip.',

    learnings: [
      'Backpropagation algoritması chain rule matematiğine dayanıyor',
      'Gradient descent\'in farklı varyantları (SGD, momentum) önemli farklar yaratıyor',
      'Aktivasyon fonksiyonları non-linearity sağlıyor ve kritik önemde',
      'Framework\'lerin arkasındaki matematiği anlamak debugging\'i kolaylaştırıyor'
    ],

    techStack: ['Python', 'NumPy', 'Mathematics'],

    github: 'https://github.com/DuranGZR/Simple-Artificial-Neuron',
    demo: undefined,

    thumbnail: '/projects/neuron.jpg',
    tags: ['Neural Networks', 'Deep Learning Fundamentals', 'NumPy']
  },

  {
    id: 'pharmacy',
    title: 'Eczane Otomasyon Sistemi',
    status: 'completed',
    oneLiner: 'C# ile geliştirilmiş kapsamlı eczane yönetim ve satış takip sistemi.',

    problem: 'Eczanelerde stok takibi, ilaç yönetimi ve satış işlemlerinin dijitalleştirilmesi için otomasyon sistemi gerekiyor.',

    constraints: [
      'Kullanıcı dostu arayüz tasarımı',
      'Güvenilir veritabanı entegrasyonu',
      'Stok yönetimi ve uyarı sistemi',
      'Raporlama ve istatistik özellikleri'
    ],

    approach: 'Windows Forms ile masaüstü uygulama geliştirildi. SQL veritabanı ile CRUD işlemleri implemente edildi. OOP prensipleri uygulandı.',

    modelChoice: {
      name: 'Windows Forms + SQL Server',
      rationale: 'Masaüstü uygulamalar için stabil ve yaygın kullanılan teknoloji. Kurumsal ortamlarda güvenilir çözüm.'
    },

    evaluation: {
      metrics: [
        { name: 'Tamamlanma', value: '%100' },
        { name: 'Özellik Sayısı', value: '10+' },
        { name: 'Kullanılabilirlik', value: 'Yüksek' }
      ],
      approach: 'Manuel test ve kullanıcı geri bildirimi ile değerlendirildi.'
    },

    outcome: 'Tam işlevsel eczane otomasyon sistemi geliştirildi. OOP prensiplerinin gerçek dünya uygulaması oldu.',

    learnings: [
      'Desktop uygulama geliştirme süreçlerini öğrendim',
      'Veritabanı tasarımı ve normalizasyon önemli',
      'OOP prensipleri (encapsulation, inheritance) kod kalitesini artırıyor',
      'Kullanıcı arayüzü tasarımı kullanıcı deneyimini doğrudan etkiliyor'
    ],

    techStack: ['C#', 'Windows Forms', 'SQL', 'OOP'],

    github: 'https://github.com/DuranGZR/Pharmacy_Automation',
    demo: undefined,

    thumbnail: '/projects/pharmacy.jpg',
    tags: ['C#', 'Desktop App', 'Database', 'OOP']
  },

  {
    id: 'bus-ticket',
    title: 'Otobüs Bilet Rezervasyon Sistemi',
    status: 'completed',
    oneLiner: 'Java ile geliştirilmiş otobüs seferi ve bilet yönetim sistemi.',

    problem: 'Otobüs firmalarında bilet satış ve koltuk rezervasyon süreçlerinin dijitalleştirilmesi gerekiyor.',

    constraints: [
      'Çoklu sefer ve otobüs yönetimi',
      'Koltuk seçimi ve rezervasyon işlemleri',
      'Veri yapılarının etkin kullanımı',
      'OOP ilkelerine uygun tasarım'
    ],

    approach: 'Java Swing ile graphical user interface geliştirildi. ArrayList, HashMap gibi veri yapıları ile veri yönetimi sağlandı. OOP tasarım kalıpları uygulandı.',

    modelChoice: {
      name: 'Java Swing',
      rationale: 'Java için standart GUI toolkit. Platform bağımsız çalışma. Veri yapıları ve OOP öğrenimi için uygun.'
    },

    evaluation: {
      metrics: [
        { name: 'Çalışan Özellikler', value: '%100' },
        { name: 'OOP Uyumu', value: 'Yüksek' },
        { name: 'Kod Kalitesi', value: 'İyi' }
      ],
      approach: 'Manuel test ile fonksiyonellik doğrulandı.'
    },

    outcome: 'Tam işlevsel bilet rezervasyon sistemi geliştirildi. Java ve OOP pratik uygulaması olarak değerli deneyim sağladı.',

    learnings: [
      'Java Swing ile GUI geliştirme temellerini öğrendim',
      'Veri yapılarının pratik kullanım alanlarını gördüm',
      'OOP tasarım kalıpları (MVC benzeri) kod organizasyonunu iyileştiriyor',
      'Event-driven programlama paradigmasını uyguladım'
    ],

    techStack: ['Java', 'Swing', 'OOP', 'Data Structures'],

    github: 'https://github.com/DuranGZR/A_Bus_Ticket_Reservation_System',
    demo: undefined,

    thumbnail: '/projects/bus-ticket.jpg',
    tags: ['Java', 'Desktop App', 'OOP', 'Data Structures']
  }
]

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

// Helper function to get projects by status
export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return projects.filter(project => project.status === status)
}

// Helper function to get all tags
export const getAllTags = (): string[] => {
  const allTags = projects.flatMap(project => project.tags)
  return Array.from(new Set(allTags)).sort()
}
