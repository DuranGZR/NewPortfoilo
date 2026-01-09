// Placeholder Project Data
// Bu dosya gerçek projelerle güncellenecek

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
    id: 'sentiment-analysis',
    title: 'E-commerce Review Intelligence System',
    status: 'completed',
    oneLiner: 'Multi-class sentiment analysis on Turkish product reviews with 89% accuracy',
    
    problem: 'E-commerce platforms need automated review analysis. Turkish language lacks robust pre-trained models for sentiment nuances in product reviews.',
    
    constraints: [
      'Limited labeled Turkish review dataset',
      'Need for multi-class (positive/negative/neutral/mixed)',
      'Real-time inference requirement (<200ms)',
      'Cost-effective (can\'t use GPT-4 for all reviews)'
    ],
    
    approach: 'Fine-tuned BERTurk on custom-labeled dataset. Implemented ensemble with rule-based fallback for edge cases. Optimized inference with ONNX.',
    
    modelChoice: {
      name: 'BERTurk (Transformer)',
      rationale: 'Tried LSTM baseline (76% accuracy) but transformer architecture captured contextual nuances better. BERTurk chosen over multilingual BERT due to 12% accuracy gain on Turkish-specific idioms.'
    },
    
    evaluation: {
      metrics: [
        { name: 'Accuracy', value: '89%' },
        { name: 'F1-Score (weighted)', value: '0.87' },
        { name: 'Inference Time', value: '145ms avg' }
      ],
      approach: 'K-fold cross-validation, separate test set from different platforms'
    },
    
    outcome: 'Successfully deployed to staging. Reduced manual review classification time by 80%. Identified 23% more actionable customer feedback.',
    
    learnings: [
      'Data quality > model complexity for this use case',
      'Class imbalance required weighted loss function',
      'ONNX quantization crucial for production speed',
      'Rule-based fallback prevented hallucination on ambiguous cases'
    ],
    
    techStack: [
      'PyTorch',
      'Transformers (HuggingFace)',
      'FastAPI',
      'ONNX Runtime',
      'Docker',
      'PostgreSQL',
      'Scikit-learn'
    ],
    
    github: 'https://github.com/durangezer/review-sentiment',
    demo: undefined,
    
    thumbnail: '/projects/sentiment-analysis.jpg',
    tags: ['NLP', 'Transformers', 'Production ML', 'Turkish']
  },
  
  {
    id: 'predictive-maintenance',
    title: 'Factory Equipment Failure Prediction',
    status: 'in-progress',
    oneLiner: 'Time-series anomaly detection for predicting equipment failures 4-6 hours in advance',
    
    problem: 'Manufacturing downtime costs $260K per hour. Reactive maintenance is expensive. Need predictive system to prevent failures.',
    
    constraints: [
      'Noisy sensor data (vibration, temperature, pressure)',
      'Class imbalance (99.8% normal, 0.2% failure)',
      'Must minimize false positives (unnecessary shutdowns costly)',
      'Edge deployment preferred (low latency, data privacy)'
    ],
    
    approach: 'LSTM-based autoencoder for anomaly detection. Threshold tuning optimized for precision>0.85. Currently implementing online learning for drift adaptation.',
    
    modelChoice: {
      name: 'LSTM Autoencoder',
      rationale: 'Evaluated ARIMA (too simple), Isolation Forest (poor with temporal patterns), and Transformer (overkill). LSTM autoencoder balanced complexity and explainability while handling time-series naturally.'
    },
    
    evaluation: {
      metrics: [
        { name: 'Precision', value: '0.87' },
        { name: 'Recall', value: '0.74' },
        { name: 'Lead Time', value: '4.2 hours avg' }
      ],
      approach: 'Time-series split validation, separate factory line for testing'
    },
    
    outcome: 'Currently in testing phase. Early results show 65% reduction in unplanned downtime on test equipment.',
    
    learnings: [
      'Domain knowledge critical (worked with factory engineers)',
      'Feature engineering > raw sensor data',
      'Explainability matters (engineers need to trust predictions)',
      'Edge deployment harder than expected (optimization ongoing)'
    ],
    
    techStack: [
      'TensorFlow/Keras',
      'TensorFlow Lite',
      'InfluxDB',
      'Grafana',
      'Python',
      'NumPy',
      'Pandas'
    ],
    
    github: undefined,
    demo: undefined,
    
    thumbnail: '/projects/predictive-maintenance.jpg',
    tags: ['Time-Series', 'Anomaly Detection', 'IoT', 'Edge ML']
  },
  
  {
    id: 'code-review-assistant',
    title: 'Intelligent Code Review Copilot',
    status: 'planned',
    oneLiner: 'LLM-based assistant for suggesting code improvements and catching anti-patterns',
    
    problem: 'Code reviews are time-consuming and quality varies by reviewer. Need automated first-pass to catch common issues, freeing humans for architectural decisions.',
    
    constraints: [
      'Must understand multiple languages (Python, JS, Java)',
      'Context awareness (whole file, not just snippet)',
      'No false positives on stylistic preferences',
      'Privacy (code stays local or private cloud)'
    ],
    
    approach: 'Fine-tune CodeLLaMA on curated code review comments. Implement RAG for project-specific patterns. Rule-based filters for style issues.',
    
    modelChoice: {
      name: 'CodeLLaMA (13B) + RAG',
      rationale: 'Open-source (privacy), specialized for code, reasonable size for fine-tuning. RAG adds project context without retraining.'
    },
    
    evaluation: {
      metrics: [
        { name: 'Precision on bug detection', value: 'Target: >0.8' },
        { name: 'Developer acceptance rate', value: 'Target: >60%' },
        { name: 'Time saved per review', value: 'Target: 15+ min' }
      ],
      approach: 'Planned: A/B test with dev team, manual annotation of suggestions'
    },
    
    outcome: 'Researching feasibility. Exploring whether local LLM can compete with GitHub Copilot while maintaining privacy.',
    
    learnings: [
      'Research phase - no learnings yet',
      'Exploring fine-tuning vs prompt engineering trade-offs'
    ],
    
    techStack: [
      'CodeLLaMA',
      'LangChain',
      'ChromaDB',
      'FastAPI',
      'VS Code Extension API'
    ],
    
    github: undefined,
    demo: undefined,
    
    thumbnail: '/projects/code-review.jpg',
    tags: ['LLM', 'Code Analysis', 'RAG', 'Developer Tools']
  },
  
  {
    id: 'warehouse-vision',
    title: 'Smart Inventory Vision System',
    status: 'planned',
    oneLiner: 'YOLOv8-based real-time detection for automated inventory tracking',
    
    problem: 'Manual inventory counting is error-prone and slow. Need automated system to track items on conveyor belts.',
    
    constraints: [
      'Real-time (>30 FPS)',
      'High accuracy (misses costly)',
      'Variable lighting conditions',
      'Edge deployment (camera on device)'
    ],
    
    approach: 'YOLOv8 fine-tuned on warehouse items. Data augmentation for lighting variations. TensorRT optimization for edge GPU.',
    
    modelChoice: {
      name: 'YOLOv8',
      rationale: 'Industry standard for real-time detection. Better speed-accuracy tradeoff than RCNN. Easier edge deployment than transformers.'
    },
    
    evaluation: {
      metrics: [
        { name: 'FPS', value: 'Target: >30' },
        { name: 'mAP', value: 'Target: >0.85' },
        { name: 'Miss rate', value: 'Target: <2%' }
      ],
      approach: 'Planned: Real warehouse testing over 1 month'
    },
    
    outcome: 'Need access to warehouse for data collection. Exploring partnerships with logistics companies.',
    
    learnings: [
      'Concept phase - no learnings yet'
    ],
    
    techStack: [
      'YOLOv8',
      'PyTorch',
      'TensorRT',
      'OpenCV',
      'NVIDIA Jetson'
    ],
    
    github: undefined,
    demo: undefined,
    
    thumbnail: '/projects/warehouse-vision.jpg',
    tags: ['Computer Vision', 'Real-time', 'Edge ML', 'Object Detection']
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
