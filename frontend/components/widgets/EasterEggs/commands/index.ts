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
\x1b[33m  neofetch\x1b[0m        System info with ASCII art\r
\x1b[33m  date\x1b[0m            Show current date and time\r
\x1b[33m  secrets\x1b[0m         View your achievement progress\r
\x1b[33m  matrix\x1b[0m          Enter the matrix...\r
\x1b[33m  coffee\x1b[0m          Check coffee consumption stats\r
\x1b[33m  skills\x1b[0m          Display skills in ASCII art\r
\x1b[33m  socials\x1b[0m         My social media links\r
\x1b[33m  hire\x1b[0m            Contact info & CV\r
\x1b[33m  snake\x1b[0m           Play a mini snake game 🐍\r
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

    case 'neofetch':
      return `\r
\x1b[36m                   ..,,,..                    \x1b[0m   \x1b[1;36mduran\x1b[0m@\x1b[1;36mai-portfolio\x1b[0m\r
\x1b[36m             .;lxkOOOOOOkxl;.                 \x1b[0m   ─────────────────────\r
\x1b[36m          .ckKNWMMMMMMMMMMWNKkc.              \x1b[0m   \x1b[1;33mOS:\x1b[0m Brain 4.0 (Neural Edition)\r
\x1b[36m        .oKWMMMMMMMMMMMMMMMMMMWKo.            \x1b[0m   \x1b[1;33mHost:\x1b[0m İzmir, Turkey\r
\x1b[36m       :0WMMMMMMMMMMMMMMMMMMMMMMW0:           \x1b[0m   \x1b[1;33mKernel:\x1b[0m Computer Engineering 4th Year\r
\x1b[36m      ;KMMMMMMMMMMMMMMMMMMMMMMMMMMK;          \x1b[0m   \x1b[1;33mUptime:\x1b[0m İnönü University (2022-2026)\r
\x1b[36m     .OMMMMMMMMMMMMMMMMMMMMMMMMMMMMO.         \x1b[0m   \x1b[1;33mPackages:\x1b[0m AI/ML, Web, Mobile\r
\x1b[36m     lWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMl         \x1b[0m   \x1b[1;33mShell:\x1b[0m duran-terminal v2.0\r
\x1b[36m     dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMd         \x1b[0m   \x1b[1;33mResolution:\x1b[0m Full-Stack Vision\r
\x1b[36m     dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMd         \x1b[0m   \x1b[1;33mDE:\x1b[0m Coffee-Driven Development\r
\x1b[36m     lWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMl         \x1b[0m   \x1b[1;33mWM:\x1b[0m VS Code + Cursor\r
\x1b[36m     .OMMMMMMMMMMMMMMMMMMMMMMMMMMMMO.         \x1b[0m   \x1b[1;33mTheme:\x1b[0m Dark Mode Always\r
\x1b[36m      ;KMMMMMMMMMMMMMMMMMMMMMMMMMMK;          \x1b[0m   \x1b[1;33mTerminal:\x1b[0m xterm.js\r
\x1b[36m       :0WMMMMMMMMMMMMMMMMMMMMMMW0:           \x1b[0m   \x1b[1;33mGPA:\x1b[0m 2.84/4.0\r
\x1b[36m        .oKWMMMMMMMMMMMMMMMMMMWKo.            \x1b[0m   \x1b[1;33mFocus:\x1b[0m AI/ML Engineering\r
\x1b[36m          .ckKNWMMMMMMMMMMWNKkc.              \x1b[0m   \r
\x1b[36m             .;lxkOOOOOOkxl;.                 \x1b[0m   \x1b[40m  \x1b[41m  \x1b[42m  \x1b[43m  \x1b[44m  \x1b[45m  \x1b[46m  \x1b[47m  \x1b[0m\r
\x1b[36m                   ..,,,..                    \x1b[0m`

    case 'socials':
      return `\r
\x1b[1;35m╔═══════════════════════════════════════════════════╗\x1b[0m\r
\x1b[1;35m║           🌐 SOCIAL LINKS & PROFILES 🌐           ║\x1b[0m\r
\x1b[1;35m╚═══════════════════════════════════════════════════╝\x1b[0m\r
\r
  \x1b[36m📦 GitHub\x1b[0m      → github.com/DuranGZR\r
  \x1b[34m💼 LinkedIn\x1b[0m    → linkedin.com/in/durangezer\r
  \x1b[32m🌐 Portfolio\x1b[0m   → durangezer.com\r
\r
\x1b[2m💡 Pro tip: Click the links in the footer to visit!\x1b[0m\r
\x1b[2mAlso try: 'hire' command for contact info.\x1b[0m`

    case 'hire':
    case 'contact':
    case 'cv':
      return `\r
\x1b[1;32m╔═══════════════════════════════════════════════════════════╗\x1b[0m\r
\x1b[1;32m║                    💼 HIRE ME! 💼                         ║\x1b[0m\r
\x1b[1;32m╚═══════════════════════════════════════════════════════════╝\x1b[0m\r
\r
  \x1b[1;33m👤 Name:\x1b[0m        Duran Gezer\r
  \x1b[1;33m🎓 Education:\x1b[0m   B.S. Computer Engineering (İnönü University)\r
  \x1b[1;33m📅 Year:\x1b[0m        4th Year (2022 - 2026)\r
  \x1b[1;33m📊 GPA:\x1b[0m         2.84/4.0\r
  \x1b[1;33m📍 Location:\x1b[0m    İzmir, Turkey\r
  \x1b[1;33m🌐 Languages:\x1b[0m   Turkish (Native), English\r
\r
\x1b[1;36m═══════════════════════════════════════════════════════════\x1b[0m\r
\r
  \x1b[1m🎯 OPEN TO:\x1b[0m\r
  • AI/ML Engineering Internships & Positions\r
  • Full-Stack Development Projects\r
  • Freelance Web Development\r
  • Open Source Collaborations\r
\r
  \x1b[1m📬 CONTACT:\x1b[0m\r
  • LinkedIn: linkedin.com/in/durangezer\r
  • GitHub:   github.com/DuranGZR\r
  • Website:  durangezer.com\r
\r
  \x1b[1m📄 CV:\x1b[0m Check my portfolio for downloadable CV!\r
\r
\x1b[1;32m═══════════════════════════════════════════════════════════\x1b[0m\r
\r
\x1b[33m⚡ Fun Fact: You found this terminal via Konami Code!\x1b[0m\r
\x1b[33m   That means you're the kind of person I'd love to work with.\x1b[0m\r
\r
\x1b[2mLet's build something amazing together! 🚀\x1b[0m`

    case 'snake':
      return `\r
\x1b[1;32m╔═══════════════════════════════════════════════════╗\x1b[0m\r
\x1b[1;32m║              🐍 TERMINAL SNAKE 🐍                  ║\x1b[0m\r
\x1b[1;32m╚═══════════════════════════════════════════════════╝\x1b[0m\r
\r
\x1b[33m⚠️  Snake game requires a dedicated game window!\x1b[0m\r
\r
But here's an ASCII snake for you:\r
\r
\x1b[32m     ____\r
    /    \\\\\r
   | 🐍   |\r
    \\____/~~~~~~~~~~~🍎\r
\x1b[0m\r
\r
\x1b[36m🎮 MINI CHALLENGE:\x1b[0m\r
Guess how many bugs I fixed building this portfolio?\r
\r
A) 42    B) 69    C) 100+    D) We don't talk about bugs\r
\r
\x1b[2m(The answer is always D)\x1b[0m\r
\r
\x1b[35m🏆 Achievement: Snake Charmer - You tried to play snake!\x1b[0m`

    case 'whoami':
      return `\r
\x1b[1;32m╔═══════════════════════════════════════╗\x1b[0m\r
\x1b[1;32m║         SYSTEM USER INFO              ║\x1b[0m\r
\x1b[1;32m╚═══════════════════════════════════════╝\x1b[0m\r
\r
\x1b[1mUser:\x1b[0m         Duran Gezer\r
\x1b[1mRole:\x1b[0m         AI/ML Engineer (in training)\r
\x1b[1mUniversity:\x1b[0m   İnönü University\r
\x1b[1mDegree:\x1b[0m       Computer Engineering (4th Year)\r
\x1b[1mLocation:\x1b[0m     İzmir, Turkey\r
\x1b[1mGPA:\x1b[0m          2.84/4.0\r
\x1b[1mStatus:\x1b[0m       Building cool stuff 🚀\r
\x1b[1mInterests:\x1b[0m    AI/ML, Full-Stack, DevOps\r
\r
\x1b[33mActivities:\x1b[0m\r
• DevOps Developer @ HSD İNÖNÜ\r
• Ex-President @ Cyber Security Community\r
\r
\x1b[33mCommands Used:\x1b[0m ${commandHistory.length}\r
\x1b[33mFiles Read:\x1b[0m ${filesRead.size}/${Object.keys(fileSystem).length}\r
\r
\x1b[2m"Learning is a journey, every project is a new discovery."\x1b[0m`

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
        { name: 'Quote Collector', status: quoteCount >= 5, icon: '💬' },
        { name: 'Snake Charmer', status: commandHistory.includes('snake'), icon: '🐍' },
        { name: 'Professional', status: commandHistory.includes('hire') || commandHistory.includes('cv'), icon: '💼' }
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
\x1b[1mCompletion:\x1b[0m ${'█'.repeat(unlockedCount * 4)}${'░'.repeat((achievements.length - unlockedCount) * 4)} ${Math.round(unlockedCount / achievements.length * 100)}%\r
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
                Knock, knock, Neo.
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
   _____ _    _ _ _     
  / ____| |  (_) | |    
 | (___ | | ___| | |___ 
  \\___ \\| |/ / | | / __|
  ____) |   <| | | \\__ \\
 |_____/|_|\\_\\_|_|_|___/
\x1b[0m\r
\r
\x1b[33m🤖 AI/ML:\x1b[0m\r
  █████████████░░░░░░░ TensorFlow     65%\r
  █████████████░░░░░░░ PyTorch        65%\r
  ████████████░░░░░░░░ Scikit-learn   60%\r
  ██████████░░░░░░░░░░ OpenCV         50%\r
  ████████████████░░░░ Python         80%\r
\r
\x1b[33m⚡ Frontend:\x1b[0m\r
  ██████████████░░░░░░ React/Next.js  70%\r
  █████████████░░░░░░░ TypeScript     65%\r
  ████████████░░░░░░░░ Three.js       60%\r
  ████████████████░░░░ Tailwind CSS   80%\r
\r
\x1b[33m🚀 Backend:\x1b[0m\r
  █████████████░░░░░░░ FastAPI        65%\r
  ██████████████░░░░░░ Node.js        70%\r
  ██████████████░░░░░░ REST APIs      70%\r
\r
\x1b[33m📱 Mobile:\x1b[0m\r
  ████████████░░░░░░░░ Flutter        60%\r
  █████████████░░░░░░░ Android/Kotlin 65%\r
\r
\x1b[33m🛠️ DevOps:\x1b[0m\r
  ████████████░░░░░░░░ Docker         60%\r
  ██████████░░░░░░░░░░ CI/CD          50%\r
  █████████████░░░░░░░ Git            65%\r
\r
\x1b[33m☕ Coffee:\x1b[0m\r
  ████████████████████ Expert        100%\r
\r
\x1b[2m📊 Note: Honest self-assessments, always learning!\x1b[0m`

    case 'joke':
      const jokes = [
        "Why do programmers prefer dark mode?\r\nBecause light attracts bugs! 🐛",
        "How many AI engineers does it take to change a light bulb?\r\nNone, that's a hardware problem. 💡",
        "Why did the neural network go to therapy?\r\nToo many layers of emotional baggage! 🧠",
        "What's an AI's favorite type of music?\r\nAlgo-rhythm! 🎵",
        "Why do ML engineers make bad comedians?\r\nTheir jokes always overfit to the training audience! 😄",
        "I told my model a joke...\r\nIt didn't get it. Said it was an outlier. 📊",
        "Why was the JavaScript developer sad?\r\nBecause he didn't Node how to Express himself! 😢",
        "Why do Java developers wear glasses?\r\nBecause they can't C#! 👓"
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
        '"Learning is a journey, every project is a new discovery."',
        '"Talk is cheap. Show me the code." - Linus Torvalds',
        '"Simplicity is the ultimate sophistication." - Leonardo da Vinci'
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
      if (['vim', 'nano', 'emacs'].includes(cmd.toLowerCase())) {
        return `\x1b[33m📝 No text editors here! But I respect your choice of ${cmd}.\x1b[0m`
      }
      if (['git', 'npm', 'yarn', 'pip'].includes(cmd.toLowerCase())) {
        return `\x1b[36m📦 ${cmd}? Check out my GitHub: github.com/DuranGZR\x1b[0m`
      }
      return `\x1b[31m${cmd}: command not found\x1b[0m\r\n\x1b[2mType 'help' to see available commands\x1b[0m`
  }
}

export const resetCommandState = () => {
  commandHistory = []
  filesRead = new Set()
  quoteCount = 0
}
