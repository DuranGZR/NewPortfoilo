import { fileSystem } from '../data/filesystem'

let commandHistory: string[] = []
let filesRead: Set<string> = new Set()
let quoteCount = 0

export const executeCommand = (command: string): string => {
  const [cmd, ...args] = command.trim().split(' ')
  commandHistory.push(cmd)
  
  // Track unique commands for achievement
  const uniqueCommands = new Set(commandHistory)
  
  switch (cmd.toLowerCase()) {
    case 'help':
      return `\r
\x1b[1;36m╔═══════════════════════════════════════════════════╗\x1b[0m\r
\x1b[1;36m║            AVAILABLE COMMANDS                     ║\x1b[0m\r
\x1b[1;36m╚═══════════════════════════════════════════════════╝\x1b[0m\r
\r
\x1b[33m  ls\x1b[0m              List all files\r
\x1b[33m  cat <file>\x1b[0m      Read file contents\r
\x1b[33m  whoami\x1b[0m          Display user information\r
\x1b[33m  date\x1b[0m            Show current date and time\r
\x1b[33m  secrets\x1b[0m         View your achievement progress\r
\x1b[33m  matrix\x1b[0m          Enter the matrix...\r
\x1b[33m  coffee\x1b[0m          Check coffee consumption stats\r
\x1b[33m  skills\x1b[0m          Display skills in ASCII art\r
\x1b[33m  joke\x1b[0m            Random developer joke\r
\x1b[33m  quote\x1b[0m           Get an AI/coding quote\r
\x1b[33m  clear\x1b[0m           Clear the terminal\r
\x1b[33m  history\x1b[0m         Show command history\r
\x1b[33m  stats\x1b[0m           Your terminal statistics\r
\x1b[33m  exit\x1b[0m            Close terminal (or press ESC)\r
\r
\x1b[2mTip: Some commands have hidden features. Keep exploring!\x1b[0m`
    
    case 'ls':
    case 'dir':
      const files = Object.keys(fileSystem)
      return `\r
\x1b[36mFiles in current directory:\x1b[0m\r
${files.map(f => `  \x1b[32m${f.startsWith('.') ? '\x1b[2m' : ''}${f}\x1b[0m`).join('\r\n')}\r
\r
\x1b[2mTotal: ${files.length} files\x1b[0m\r
\x1b[2mUse 'cat <filename>' to read a file\x1b[0m`
    
    case 'cat':
    case 'read':
      const filename = args[0]
      if (!filename) {
        return '\x1b[31mError: No file specified\x1b[0m\n\x1b[2mUsage: cat <filename>\x1b[0m'
      }
      if (!fileSystem[filename]) {
        return `\x1b[31mcat: ${filename}: No such file or directory\x1b[0m\n\x1b[2mTry 'ls' to see available files\x1b[0m`
      }
      filesRead.add(filename)
      
      // Check for special file achievements
      if (filename === '.secrets') {
        return `\x1b[32m🎊 Achievement Unlocked: Secret Finder! 🎊\x1b[0m\r\n${fileSystem[filename]}`
      }
      if (filename === 'coffee.log') {
        return `\x1b[32m☕ Achievement Unlocked: Coffee Connoisseur! ☕\x1b[0m\r\n${fileSystem[filename]}`
      }
      
      return fileSystem[filename]
    
    case 'whoami':
      return `\r
\x1b[1;32m╔═══════════════════════════════════════╗\x1b[0m\r
\x1b[1;32m║         SYSTEM USER INFO              ║\x1b[0m\r
\x1b[1;32m╚═══════════════════════════════════════╝\x1b[0m\r
\r
\x1b[1mUser:\x1b[0m         Duran Gezer\r
\x1b[1mRole:\x1b[0m         AI Engineer (in training)\r
\x1b[1mStatus:\x1b[0m       Building cool stuff 🚀\r
\x1b[1mLevel:\x1b[0m        Over 9000\r
\x1b[1mSkills:\x1b[0m       AI/ML, Full-Stack, 3D Graphics\r
\x1b[1mCoffee:\x1b[0m       ☕☕☕☕☕☕ (6/day)\r
\r
\x1b[33mEaster Eggs Found:\x1b[0m ${uniqueCommands.size >= 10 ? '🎉 You found this!' : 'Keep exploring...'}\r
\x1b[33mCommands Used:\x1b[0m ${commandHistory.length}\r
\x1b[33mFiles Read:\x1b[0m ${filesRead.size}/${Object.keys(fileSystem).length}\r
\r
\x1b[2m"The only way to do great work is to love what you do." - Steve Jobs\x1b[0m`
    
    case 'date':
    case 'time':
      const now = new Date()
      return `\r
\x1b[36m${now.toString()}\x1b[0m\r
\r
\x1b[2mEpoch:\x1b[0m ${now.getTime()}\r
\x1b[2mISO:\x1b[0m   ${now.toISOString()}\r
\r
\x1b[33m⏰ Fun Fact:\x1b[0m It's always a good time to code!`
    
    case 'secrets':
    case 'achievements':
      const totalFiles = Object.keys(fileSystem).length
      const achievements = [
        { name: 'Konami Master', status: true, icon: '🎮' },
        { name: 'File Explorer', status: filesRead.size === totalFiles, icon: '📁' },
        { name: 'Command Master', status: uniqueCommands.size >= 10, icon: '💻' },
        { name: 'Secret Finder', status: filesRead.has('.secrets'), icon: '🕵️' },
        { name: 'Matrix Dweller', status: commandHistory.includes('matrix'), icon: '🔴' },
        { name: 'Coffee Connoisseur', status: filesRead.has('coffee.log'), icon: '☕' },
        { name: 'Quote Collector', status: quoteCount >= 5, icon: '💬' }
      ]
      
      const unlockedCount = achievements.filter(a => a.status).length
      
      return `\r
\x1b[1;35m╔═══════════════════════════════════════════════════╗\x1b[0m\r
\x1b[1;35m║           🏆 ACHIEVEMENT PROGRESS 🏆              ║\x1b[0m\r
\x1b[1;35m╚═══════════════════════════════════════════════════╝\x1b[0m\r
\r
${achievements.map(a => 
  `${a.status ? '\x1b[32m✓' : '\x1b[90m✗'} ${a.icon} ${a.name}\x1b[0m`
).join('\r\n')}\r
\r
\x1b[1mProgress:\x1b[0m ${unlockedCount}/${achievements.length} unlocked\r
\x1b[1mCompletion:\x1b[0m ${'█'.repeat(unlockedCount * 5)}${'░'.repeat((achievements.length - unlockedCount) * 5)} ${Math.round(unlockedCount/achievements.length * 100)}%\r
\r
${unlockedCount === achievements.length ? 
  '\x1b[1;33m🎊 CONGRATULATIONS! You unlocked everything! 🎊\x1b[0m' : 
  '\x1b[2mKeep exploring to unlock more achievements!\x1b[0m'}`
    
    case 'matrix':
      return `\r
\x1b[32m
    ▓▓▓▓▓▓▓▓   Wake up, Neo...\r
  ▓▓▓▓▓▓▓▓▓▓▓▓\r
  ▓▓▓▓▓▓▓▓▓▓▓▓  The Matrix has you...\r
    ▓▓▓▓▓▓▓▓\r
      ▓▓▓▓      Follow the white rabbit.\r
       ▓▓\r
                Knock, knock, Neo.\r
\x1b[0m\r
\x1b[33m🔴 Achievement Unlocked: Matrix Dweller! 🔴\x1b[0m\r
\r
\x1b[2m(Just kidding, this is still a portfolio 😄)\r
But imagine if it wasn't... 🤔\x1b[0m`
    
    case 'coffee':
      return fileSystem['coffee.log']
    
    case 'skills':
      return `\r
\x1b[1;36m
   _____ _    _ _ _     \r
  / ____| |  (_) | |    \r
 | (___ | | ___| | |___ \r
  \\___ \\| |/ / | | / __|\r
  ____) |   <| | | \\__ \\\r
 |_____/|_|\\_\\_|_|_|___/\r
\x1b[0m\r
\r
\x1b[33m🤖 AI/ML:\x1b[0m\r
  ████████████████████░ PyTorch       95%\r
  ███████████████████░░ TensorFlow    90%\r
  ██████████████████░░░ Transformers  85%\r
  ████████████████░░░░░ LangChain     75%\r
\r
\x1b[33m⚡ Frontend:\x1b[0m\r
  ████████████████████░ React/Next.js 95%\r
  ███████████████████░░ TypeScript    90%\r
  ██████████████████░░░ Three.js      85%\r
  ███████████████░░░░░░ Tailwind CSS  80%\r
\r
\x1b[33m🚀 Backend:\x1b[0m\r
  ███████████████████░░ FastAPI       90%\r
  ██████████████████░░░ Node.js       85%\r
  █████████████████░░░░ Python        92%\r
\r
\x1b[33m☕ Coffee:\x1b[0m\r
  ████████████████████████ Expert    120%`
    
    case 'joke':
      const jokes = [
        "Why do programmers prefer dark mode?\r\nBecause light attracts bugs! 🐛",
        "How many AI engineers does it take to change a light bulb?\r\nNone, that's a hardware problem. 💡",
        "Why did the neural network go to therapy?\r\nToo many layers of emotional baggage! 🧠",
        "What's an AI's favorite type of music?\r\nAlgo-rhythm! 🎵",
        "Why do ML engineers make bad comedians?\r\nTheir jokes always overfit to the training audience! 😄",
        "I told my model a joke...\r\nIt didn't get it. Said it was an outlier. 📊"
      ]
      return `\x1b[33m😄 ${jokes[Math.floor(Math.random() * jokes.length)]}\x1b[0m`
    
    case 'quote':
      quoteCount++
      const quotes = [
        '"AI will not replace humans. Humans with AI will replace humans without AI."',
        '"The best way to predict the future is to create it."',
        '"First, solve the problem. Then, write the code."',
        '"Any sufficiently advanced technology is indistinguishable from magic."',
        '"AI is neither good nor evil. It\'s a tool. How we use it defines us."',
        '"The question isn\'t whether AI will change your field. It\'s whether you\'ll be part of that change."'
      ]
      const quote = quotes[Math.floor(Math.random() * quotes.length)]
      
      if (quoteCount === 5) {
        return `\x1b[36m${quote}\x1b[0m\r\n\r\n\x1b[32m💬 Achievement Unlocked: Quote Collector! 💬\x1b[0m`
      }
      return `\x1b[36m${quote}\x1b[0m\r\n\x1b[2m(Quote ${quoteCount}/5 for achievement)\x1b[0m`
    
    case 'clear':
    case 'cls':
      return '\x1b[2J\x1b[3J\x1b[H'
    
    case 'history':
      return `\r
\x1b[36mCommand History:\x1b[0m\r
${commandHistory.map((cmd, i) => `  ${i + 1}. ${cmd}`).join('\r\n')}\r
\r
\x1b[2mTotal commands: ${commandHistory.length}\x1b[0m`
    
    case 'stats':
      return `\r
\x1b[1;36m╔═══════════════════════════════════════╗\x1b[0m\r
\x1b[1;36m║      TERMINAL STATISTICS              ║\x1b[0m\r
\x1b[1;36m╚═══════════════════════════════════════╝\x1b[0m\r
\r
\x1b[33mCommands Used:\x1b[0m      ${commandHistory.length}\r
\x1b[33mUnique Commands:\x1b[0m   ${uniqueCommands.size}\r
\x1b[33mFiles Read:\x1b[0m        ${filesRead.size}/${Object.keys(fileSystem).length}\r
\x1b[33mQuotes Read:\x1b[0m       ${quoteCount}\r
\x1b[33mSession Time:\x1b[0m      ${Math.floor(Math.random() * 10) + 1} minutes\r
\r
\x1b[2mYou're doing great! Keep exploring! 🚀\x1b[0m`
    
    case 'exit':
    case 'quit':
      return '\x1b[33mHint: Press ESC or click the red button to close terminal\x1b[0m'
    
    case '':
      return ''
    
    default:
      // Easter egg for trying common commands
      if (['sudo', 'rm', 'del', 'format'].includes(cmd.toLowerCase())) {
        return `\x1b[31m😱 Nice try! But you can't break this terminal.\x1b[0m\r\n\x1b[2mIt's read-only... and virtual. 😄\x1b[0m`
      }
      return `\x1b[31m${cmd}: command not found\x1b[0m\r\n\x1b[2mType 'help' to see available commands\x1b[0m`
  }
}

export const resetCommandState = () => {
  commandHistory = []
  filesRead = new Set()
  quoteCount = 0
}
