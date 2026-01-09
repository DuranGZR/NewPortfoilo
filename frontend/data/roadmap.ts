// Placeholder Roadmap Data
// Bu dosya gerçek roadmap ile güncellenecek

export type TimeframeType = 'now' | '6months' | '1year' | '2years'
export type MilestoneStatus = 'in-progress' | 'planned'

export interface Milestone {
  id: string
  timeframe: TimeframeType
  title: string
  description: string
  focus: string[]
  skills: string[]
  status: MilestoneStatus
  icon?: string
}

export const roadmap: Milestone[] = [
  {
    id: 'now',
    timeframe: 'now',
    title: 'Foundation Building',
    description: 'Completing education and building strong fundamentals in AI/ML engineering.',
    focus: [
      'Complete Computer Engineering degree (May 2026)',
      'Master PyTorch and Transformers in depth',
      'Ship 2 production-ready AI projects',
      'Build this portfolio with AI assistant'
    ],
    skills: [
      'Advanced NLP (LLMs, RAG systems)',
      'MLOps basics (Docker, CI/CD)',
      'System design fundamentals',
      'Production ML deployment'
    ],
    status: 'in-progress',
    icon: '🎓'
  },
  
  {
    id: '6-months',
    timeframe: '6months',
    title: 'First AI Engineer Role',
    description: 'Landing first professional role and contributing to real production systems.',
    focus: [
      'Land AI/ML Engineer position (startup or mid-size)',
      'Contribute to production ML systems',
      'Learn from senior engineers',
      'Ship features, not just experiments'
    ],
    skills: [
      'Production ML (monitoring, A/B testing)',
      'Scalability (distributed training)',
      'Cross-functional collaboration',
      'Code review and team workflows'
    ],
    status: 'planned',
    icon: '🚀'
  },
  
  {
    id: '1-year',
    timeframe: '1year',
    title: 'Production ML Competence',
    description: 'Owning ML features end-to-end and building deep expertise.',
    focus: [
      'Own an ML feature end-to-end',
      'Mentor junior engineers / interns',
      'Deep dive into MLOps',
      'Contribute to open source ML projects'
    ],
    skills: [
      'ML infrastructure (Kubeflow, MLflow)',
      'Model optimization (quantization, pruning)',
      'Technical writing (blog, papers)',
      'System architecture design'
    ],
    status: 'planned',
    icon: '⚙️'
  },
  
  {
    id: '2-years',
    timeframe: '2years',
    title: 'Senior Track or Specialization',
    description: 'Decision point: Generalist path vs deep specialization in specific domain.',
    focus: [
      'Decision point: Generalist (Senior ML Eng) or Specialist (NLP/CV)',
      'Lead projects, not just contribute',
      'Influence technical decisions',
      'Possibly start side project / startup'
    ],
    skills: [
      'Technical leadership',
      'Architecture design',
      'Team management',
      'Strategic thinking'
    ],
    status: 'planned',
    icon: '🎯'
  }
]

// Potential career paths at 2-year mark
export interface CareerPath {
  id: string
  title: string
  description: string
  pros: string[]
  cons: string[]
  requirements: string[]
}

export const careerPaths: CareerPath[] = [
  {
    id: 'senior-ml-engineer',
    title: 'Senior ML Engineer at Tech Company',
    description: 'Continue generalist path, leading ML projects at established tech companies.',
    pros: [
      'Broad technical expertise',
      'High compensation',
      'Stable career trajectory',
      'Work on diverse problems'
    ],
    cons: [
      'Less specialization depth',
      'Corporate politics',
      'May move away from hands-on coding'
    ],
    requirements: [
      '3-4 years experience',
      'Proven track record of shipped features',
      'Strong system design skills',
      'Leadership/mentoring experience'
    ]
  },
  
  {
    id: 'ai-research-engineer',
    title: 'AI Research Engineer',
    description: 'Combine research and engineering, potentially pursuing Master\'s degree.',
    pros: [
      'Work on cutting-edge problems',
      'Publish papers',
      'Deep technical expertise',
      'Academic collaboration'
    ],
    cons: [
      'Lower initial compensation',
      'Slower career progression',
      'May be less applied/practical'
    ],
    requirements: [
      'Strong publication record or Master\'s',
      'Deep expertise in specific area (NLP, CV, RL)',
      'Research methodology skills',
      'Ability to work independently'
    ]
  },
  
  {
    id: 'founding-ai-engineer',
    title: 'Founding AI Engineer at Startup',
    description: 'Join early-stage startup or start own venture, building 0→1.',
    pros: [
      'High impact and ownership',
      'Equity upside',
      'Wear many hats',
      'Shape technical direction'
    ],
    cons: [
      'High risk, uncertain outcome',
      'Long hours, high stress',
      'Lower initial salary',
      'Limited mentorship'
    ],
    requirements: [
      'Full-stack ML skills',
      'Ship fast mentality',
      'Business understanding',
      'High risk tolerance'
    ]
  }
]

// Helper functions
export const getMilestoneByTimeframe = (timeframe: TimeframeType): Milestone | undefined => {
  return roadmap.find(m => m.timeframe === timeframe)
}

export const getCurrentMilestone = (): Milestone | undefined => {
  return roadmap.find(m => m.status === 'in-progress')
}

export const getNextMilestones = (): Milestone[] => {
  return roadmap.filter(m => m.status === 'planned')
}

// Timeline labels
export const timeframeLabels: Record<TimeframeType, string> = {
  'now': 'Now (Dec 2025)',
  '6months': '6 Months (Jun 2026)',
  '1year': '1 Year (Dec 2026)',
  '2years': '2 Years (Dec 2027)'
}

// Timeline positions (for visualization)
export const timeframePositions: Record<TimeframeType, number> = {
  'now': 0,
  '6months': 33,
  '1year': 66,
  '2years': 100
}
