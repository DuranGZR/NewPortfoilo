import { Achievement } from '../types'

export const achievements: Achievement[] = [
  {
    id: 'konami-master',
    name: 'Konami Master',
    description: 'Discovered the Konami code',
    icon: '🎮',
    unlocked: false
  },
  {
    id: 'file-explorer',
    name: 'File Explorer',
    description: 'Read all files in the system',
    icon: '📁',
    unlocked: false
  },
  {
    id: 'command-master',
    name: 'Command Master',
    description: 'Used 10 different commands',
    icon: '💻',
    unlocked: false
  },
  {
    id: 'secret-finder',
    name: 'Secret Finder',
    description: 'Found the hidden .secrets file',
    icon: '🕵️',
    unlocked: false
  },
  {
    id: 'matrix-dweller',
    name: 'Matrix Dweller',
    description: 'Entered the matrix',
    icon: '🔴',
    unlocked: false
  },
  {
    id: 'coffee-connoisseur',
    name: 'Coffee Connoisseur',
    description: 'Read the coffee consumption log',
    icon: '☕',
    unlocked: false
  },
  {
    id: 'quote-collector',
    name: 'Quote Collector',
    description: 'Read quotes 5 times',
    icon: '💬',
    unlocked: false
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Unlocked all achievements',
    icon: '🏆',
    unlocked: false
  }
]

export const checkAndUnlockAchievement = (
  achievementId: string,
  currentAchievements: Achievement[]
): Achievement[] => {
  return currentAchievements.map(achievement => {
    if (achievement.id === achievementId && !achievement.unlocked) {
      return {
        ...achievement,
        unlocked: true,
        unlockedAt: new Date()
      }
    }
    return achievement
  })
}
