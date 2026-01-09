// Placeholder Skills Data
// Bu dosya gerçek skills ile güncellenecek

export type SkillLevel = 'learning' | 'comfortable' | 'experienced'
export type SkillCategory = 'ML' | 'Backend' | 'Data' | 'DevOps' | 'Cloud'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: SkillLevel
  relatedTo: string[] // IDs of related skills
  tools: string[]
  description?: string
}

export const skills: Skill[] = [
  // ML/DL Category
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ML',
    level: 'experienced',
    relatedTo: ['tensorflow', 'huggingface', 'onnx'],
    tools: ['torchvision', 'torchaudio', 'TensorBoard'],
    description: '1.5 years experience, primary DL framework'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'ML',
    level: 'comfortable',
    relatedTo: ['pytorch', 'keras', 'tensorflow-lite'],
    tools: ['Keras', 'TF Lite', 'TensorBoard'],
    description: 'Used for production deployments and edge ML'
  },
  {
    id: 'scikit-learn',
    name: 'scikit-learn',
    category: 'ML',
    level: 'experienced',
    relatedTo: ['pandas', 'numpy'],
    tools: ['GridSearchCV', 'Pipeline', 'preprocessing'],
    description: 'Classical ML, feature engineering, evaluation'
  },
  {
    id: 'huggingface',
    name: 'HuggingFace',
    category: 'ML',
    level: 'comfortable',
    relatedTo: ['pytorch', 'transformers'],
    tools: ['Transformers', 'Datasets', 'Tokenizers'],
    description: 'NLP projects, fine-tuning BERT models'
  },
  {
    id: 'transformers',
    name: 'Transformers',
    category: 'ML',
    level: 'comfortable',
    relatedTo: ['huggingface', 'pytorch'],
    tools: ['BERT', 'GPT', 'Attention mechanisms'],
    description: 'Understanding of architecture, fine-tuning experience'
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    category: 'ML',
    level: 'comfortable',
    relatedTo: ['scikit-learn', 'lightgbm'],
    tools: ['xgboost', 'hyperopt'],
    description: 'Tabular data, feature importance analysis'
  },
  {
    id: 'lightgbm',
    name: 'LightGBM',
    category: 'ML',
    level: 'learning',
    relatedTo: ['xgboost', 'scikit-learn'],
    tools: ['lightgbm'],
    description: 'Exploring for large dataset scenarios'
  },
  {
    id: 'onnx',
    name: 'ONNX',
    category: 'ML',
    level: 'comfortable',
    relatedTo: ['pytorch', 'tensorflow'],
    tools: ['ONNX Runtime', 'onnxruntime'],
    description: 'Model optimization for production'
  },
  
  // Backend Category
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend',
    level: 'comfortable',
    relatedTo: ['python', 'postgresql', 'docker'],
    tools: ['Pydantic', 'Uvicorn', 'SQLAlchemy'],
    description: 'Building ML model APIs'
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend',
    level: 'comfortable',
    relatedTo: ['fastapi', 'python'],
    tools: ['Flask-RESTful', 'Flask-SQLAlchemy'],
    description: 'Lightweight APIs, prototyping'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    level: 'comfortable',
    relatedTo: ['express', 'typescript'],
    tools: ['Express', 'npm', 'TypeScript'],
    description: 'Full-stack projects, API development'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    level: 'comfortable',
    relatedTo: ['nodejs', 'rest-api'],
    tools: ['Express', 'middleware', 'routing'],
    description: 'REST API development'
  },
  {
    id: 'rest-api',
    name: 'REST APIs',
    category: 'Backend',
    level: 'experienced',
    relatedTo: ['fastapi', 'express', 'nodejs'],
    tools: ['OpenAPI', 'Swagger', 'Postman'],
    description: 'API design, documentation, testing'
  },
  {
    id: 'websocket',
    name: 'WebSocket',
    category: 'Backend',
    level: 'learning',
    relatedTo: ['nodejs', 'fastapi'],
    tools: ['Socket.io', 'ws'],
    description: 'Real-time communication for chat features'
  },
  
  // Data Category
  {
    id: 'python',
    name: 'Python',
    category: 'Data',
    level: 'experienced',
    relatedTo: ['pandas', 'numpy', 'pytorch'],
    tools: ['Python 3.8+', 'asyncio', 'typing'],
    description: 'Primary programming language'
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data',
    level: 'experienced',
    relatedTo: ['numpy', 'python', 'scikit-learn'],
    tools: ['DataFrame', 'data cleaning', 'aggregation'],
    description: 'Data manipulation, analysis, preprocessing'
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data',
    level: 'experienced',
    relatedTo: ['pandas', 'python', 'scikit-learn'],
    tools: ['arrays', 'vectorization', 'linear algebra'],
    description: 'Numerical computing, matrix operations'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Data',
    level: 'comfortable',
    relatedTo: ['postgresql', 'database'],
    tools: ['PostgreSQL', 'SQLite', 'complex queries'],
    description: 'Data querying, database design'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Data',
    level: 'comfortable',
    relatedTo: ['sql', 'fastapi'],
    tools: ['pgAdmin', 'psycopg2', 'indexes'],
    description: 'Relational database for applications'
  },
  {
    id: 'influxdb',
    name: 'InfluxDB',
    category: 'Data',
    level: 'learning',
    relatedTo: ['time-series', 'grafana'],
    tools: ['InfluxQL', 'time-series'],
    description: 'Time-series data for IoT projects'
  },
  
  // DevOps Category
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    level: 'comfortable',
    relatedTo: ['docker-compose', 'kubernetes'],
    tools: ['Dockerfile', 'docker-compose', 'containers'],
    description: 'Containerization for ML models'
  },
  {
    id: 'docker-compose',
    name: 'Docker Compose',
    category: 'DevOps',
    level: 'comfortable',
    relatedTo: ['docker'],
    tools: ['docker-compose.yml', 'multi-container'],
    description: 'Multi-container application orchestration'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'DevOps',
    level: 'experienced',
    relatedTo: ['github', 'github-actions'],
    tools: ['git', 'branching', 'merge strategies'],
    description: 'Version control, collaboration'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'DevOps',
    level: 'experienced',
    relatedTo: ['git', 'github-actions'],
    tools: ['GitHub', 'PRs', 'Issues'],
    description: 'Code hosting, collaboration'
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'DevOps',
    level: 'learning',
    relatedTo: ['github', 'ci-cd'],
    tools: ['workflows', 'CI/CD pipelines'],
    description: 'Automated testing and deployment'
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'DevOps',
    level: 'comfortable',
    relatedTo: ['bash', 'docker'],
    tools: ['Ubuntu', 'bash', 'systemd'],
    description: 'Server management, scripting'
  },
  {
    id: 'bash',
    name: 'Bash',
    category: 'DevOps',
    level: 'comfortable',
    relatedTo: ['linux'],
    tools: ['shell scripting', 'automation'],
    description: 'Scripting for automation'
  },
  
  // Cloud Category
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    level: 'learning',
    relatedTo: ['ec2', 's3', 'lambda'],
    tools: ['EC2', 'S3', 'Lambda'],
    description: 'Exploring cloud deployment options'
  },
  {
    id: 'ec2',
    name: 'AWS EC2',
    category: 'Cloud',
    level: 'learning',
    relatedTo: ['aws', 'docker'],
    tools: ['EC2 instances', 'deployment'],
    description: 'VM deployment for ML models'
  },
  {
    id: 's3',
    name: 'AWS S3',
    category: 'Cloud',
    level: 'learning',
    relatedTo: ['aws'],
    tools: ['S3 buckets', 'storage'],
    description: 'Object storage for datasets'
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Cloud',
    level: 'learning',
    relatedTo: ['aws'],
    tools: ['serverless', 'functions'],
    description: 'Serverless function deployment'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Cloud',
    level: 'comfortable',
    relatedTo: ['nextjs'],
    tools: ['Vercel', 'edge functions'],
    description: 'Frontend deployment, this portfolio'
  },
  {
    id: 'railway',
    name: 'Railway',
    category: 'Cloud',
    level: 'comfortable',
    relatedTo: ['docker', 'fastapi'],
    tools: ['Railway', 'deployment'],
    description: 'Backend service deployment'
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: 'Cloud',
    level: 'learning',
    relatedTo: ['cloud'],
    tools: ['Cloud Run', 'GCS'],
    description: 'Exploring GCP services'
  },
  
  // Additional ML Tools
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ML',
    level: 'learning',
    relatedTo: ['llm', 'rag'],
    tools: ['LangChain', 'chains', 'agents'],
    description: 'Building LLM applications, RAG systems'
  },
  {
    id: 'rag',
    name: 'RAG Systems',
    category: 'ML',
    level: 'learning',
    relatedTo: ['langchain', 'vector-db'],
    tools: ['retrieval', 'generation'],
    description: 'Retrieval-Augmented Generation for chatbots'
  },
  {
    id: 'vector-db',
    name: 'Vector Databases',
    category: 'ML',
    level: 'learning',
    relatedTo: ['rag', 'embeddings'],
    tools: ['Pinecone', 'ChromaDB', 'Weaviate'],
    description: 'Vector storage for semantic search'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Backend',
    level: 'comfortable',
    relatedTo: ['react', 'typescript', 'vercel'],
    tools: ['Next.js 14', 'App Router', 'Server Components'],
    description: 'Full-stack React framework, this portfolio'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Backend',
    level: 'comfortable',
    relatedTo: ['nodejs', 'nextjs'],
    tools: ['TypeScript', 'type safety'],
    description: 'Type-safe JavaScript development'
  }
]

// Helper functions
export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter(skill => skill.category === category)
}

export const getSkillsByLevel = (level: SkillLevel): Skill[] => {
  return skills.filter(skill => skill.level === level)
}

export const getSkillById = (id: string): Skill | undefined => {
  return skills.find(skill => skill.id === id)
}

export const getRelatedSkills = (skillId: string): Skill[] => {
  const skill = getSkillById(skillId)
  if (!skill) return []
  
  return skill.relatedTo
    .map(id => getSkillById(id))
    .filter((s): s is Skill => s !== undefined)
}

export const getCategoryColor = (category: SkillCategory): string => {
  const colors: Record<SkillCategory, string> = {
    'ML': '#00d9ff',      // Cyan
    'Backend': '#0ea5e9', // Blue
    'Data': '#10b981',    // Green
    'DevOps': '#f59e0b',  // Orange
    'Cloud': '#8b5cf6'    // Purple
  }
  return colors[category]
}

export const getLevelLabel = (level: SkillLevel): string => {
  const labels: Record<SkillLevel, string> = {
    'learning': 'Learning',
    'comfortable': 'Comfortable',
    'experienced': 'Experienced'
  }
  return labels[level]
}
