// Engineering Thinking Content
// "How I Think As An Engineer" section content

export interface ThinkingCard {
  id: string
  title: string
  icon: string
  content: string
  keyPrinciple: string
  tags: string[]
}

export const thinkingCards: ThinkingCard[] = [
  {
    id: 'model-selection',
    title: 'Model Selection Framework',
    icon: '🧠',
    content: `I don't start with "let's use a neural network." I start with:

1. **What's the baseline?** (Rule-based, simple ML)
2. **Does complexity improve outcomes enough?**
3. **Can we explain the predictions?**
4. **What's the inference cost?**

**Example**: In the review sentiment project, LSTM gave 76% accuracy. BERTurk gave 89%. But for some use cases, that 13% isn't worth the 10x inference cost.

**Context matters.**`,
    keyPrinciple: 'Simplest model that solves the problem.',
    tags: ['Decision Making', 'Trade-offs', 'Pragmatism']
  },
  
  {
    id: 'production-reality',
    title: 'Production vs Academia',
    icon: '⚙️',
    content: `Academic papers optimize for accuracy. Production optimizes for:

- **Latency**: Users won't wait 5 seconds
- **Cost**: GPT-4 API isn't free
- **Maintainability**: Can others debug this?
- **Drift**: Will it still work next month?

The "best" model in a paper is often not the best in production. I learned this the hard way when my "sota" model couldn't fit in a 2GB container.`,
    keyPrinciple: 'Ship beats perfect.',
    tags: ['Production ML', 'Reality Check', 'Deployment']
  },
  
  {
    id: 'overfitting-bias',
    title: 'Overfitting & Bias',
    icon: '📊',
    content: `Two failure modes I actively fight:

**Overfitting**: Model memorizes training data, fails on real world.
- Fix: Cross-validation, separate test set, regularization

**Bias**: Model works for some groups, fails for others.
- Fix: Stratified sampling, fairness metrics, diverse test data

**Example**: My first sentiment model worked great on electronics reviews but failed on clothing. The training data was biased.`,
    keyPrinciple: 'Trust but verify. Especially on edge cases.',
    tags: ['Data Science', 'Model Validation', 'Fairness']
  },
  
  {
    id: 'tradeoffs-triangle',
    title: 'The Trade-offs Triangle',
    icon: '⚖️',
    content: `Every decision is a trade-off between three dimensions:

\`\`\`
         Accuracy
            ▲
           / \\
          /   \\
         /     \\
        /       \\
   Speed ◀─────▶ Cost
\`\`\`

You can optimize two, not all three.

- **Fast + Accurate** = Expensive (GPT-4)
- **Fast + Cheap** = Less accurate (rule-based)
- **Accurate + Cheap** = Slow (large local model)

I make trade-offs explicit in every design doc.`,
    keyPrinciple: 'There\'s no free lunch in ML.',
    tags: ['Trade-offs', 'System Design', 'Engineering']
  },
  
  {
    id: 'when-not-ai',
    title: 'When NOT to Use AI',
    icon: '🚫',
    content: `AI is not always the answer. Sometimes, it's the wrong tool.

**Don't use AI when:**
- A simple rule works (if temperature > 100°C, alert)
- You have < 1000 labeled samples
- Explainability is legally required
- Maintenance cost exceeds value
- A database query solves it

I've talked clients out of AI projects. **That's good engineering.**`,
    keyPrinciple: 'Right tool for the job.',
    tags: ['Critical Thinking', 'Engineering Judgment', 'Pragmatism']
  },
  
  {
    id: 'academic-vs-applied',
    title: 'Academic vs Applied AI',
    icon: '🎓',
    content: `I respect academic research but think like an applied engineer:

**Academic**: "This model achieves 94.5% on ImageNet"
**Applied**: "Does it work on our blurry phone photos?"

**Academic**: "State-of-the-art architecture"
**Applied**: "Can we deploy it?"

Both matter. Academia pushes boundaries. Application makes it useful.

**I bridge both worlds.**`,
    keyPrinciple: 'Theory guides, reality decides.',
    tags: ['Research', 'Applied ML', 'Bridging']
  }
]

// Helper functions
export const getThinkingCardById = (id: string): ThinkingCard | undefined => {
  return thinkingCards.find(card => card.id === id)
}

export const getAllTags = (): string[] => {
  const allTags = thinkingCards.flatMap(card => card.tags)
  return Array.from(new Set(allTags)).sort()
}

export const getCardsByTag = (tag: string): ThinkingCard[] => {
  return thinkingCards.filter(card => card.tags.includes(tag))
}
