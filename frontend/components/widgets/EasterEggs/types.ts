export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
}

export interface FileSystemEntry {
  [key: string]: string
}

export interface CommandResult {
  output: string
  error?: boolean
}
