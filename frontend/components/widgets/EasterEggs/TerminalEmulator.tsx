'use client'
import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'
import { executeCommand } from './commands'
import { X } from 'lucide-react'

interface TerminalEmulatorProps {
  onClose: () => void
}

const TerminalEmulator = ({ onClose }: TerminalEmulatorProps) => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#0a0e27',
        foreground: '#819fa7',
        cursor: '#819fa7',
        selectionBackground: '#819fa780',
        black: '#000000',
        red: '#ef4444',
        green: '#10b981',
        yellow: '#f59e0b',
        blue: '#3b82f6',
        magenta: '#8b5cf6',
        cyan: '#06b6d4',
        white: '#f3f4f6',
        brightBlack: '#6b7280',
        brightRed: '#f87171',
        brightGreen: '#34d399',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#a78bfa',
        brightCyan: '#22d3ee',
        brightWhite: '#ffffff'
      },
      cols: 100,
      rows: 28
    })

    term.loadAddon(new WebLinksAddon())
    term.open(terminalRef.current)

    // Welcome banner
    term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════╗\x1b[0m')
    term.writeln('\x1b[1;36m║     🚀 DURAN.AI SECURE TERMINAL v2.0 🚀            ║\x1b[0m')
    term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════╝\x1b[0m')
    term.writeln('')
    term.writeln('\x1b[33m⚠️  WARNING: Authorized access only.\x1b[0m')
    term.writeln('\x1b[32m✓  Authentication bypassed via Konami sequence.\x1b[0m')
    term.writeln('\x1b[35m🎮 Achievement Unlocked: Konami Master!\x1b[0m')
    term.writeln('')
    term.writeln('\x1b[2mType \x1b[1;33mhelp\x1b[0m\x1b[2m for available commands.\x1b[0m')
    term.writeln('\x1b[2mPress \x1b[1mESC\x1b[0m\x1b[2m to close terminal.\x1b[0m')
    term.writeln('')

    let currentLine = ''
    let cursorPosition = 0
    const commandHistory: string[] = []
    let historyIndex = -1

    const prompt = () => {
      term.write('\r\n\x1b[32mduran@ai\x1b[0m:\x1b[34m~\x1b[0m$ ')
    }

    prompt()

    // Command handler
    term.onKey(({ key, domEvent }) => {
      const ev = domEvent
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey

      // ESC key
      if (ev.keyCode === 27) {
        onClose()
        return
      }

      // Enter key
      if (ev.keyCode === 13) {
        term.write('\r\n')
        if (currentLine.trim()) {
          commandHistory.push(currentLine.trim())
          historyIndex = commandHistory.length
          
          const output = executeCommand(currentLine.trim())
          
          if (output === '\x1b[2J\x1b[3J\x1b[H') {
            term.clear()
          } else {
            term.write(output)
          }
        }
        currentLine = ''
        cursorPosition = 0
        prompt()
      }
      // Backspace
      else if (ev.keyCode === 8) {
        if (cursorPosition > 0) {
          currentLine = currentLine.slice(0, cursorPosition - 1) + currentLine.slice(cursorPosition)
          cursorPosition--
          term.write('\b \b')
          if (cursorPosition < currentLine.length) {
            term.write(currentLine.slice(cursorPosition) + ' ')
            for (let i = 0; i <= currentLine.length - cursorPosition; i++) {
              term.write('\b')
            }
          }
        }
      }
      // Up arrow - previous command
      else if (ev.keyCode === 38) {
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--
          // Clear current line
          term.write('\r\x1b[K')
          term.write('\x1b[32mduran@ai\x1b[0m:\x1b[34m~\x1b[0m$ ')
          currentLine = commandHistory[historyIndex]
          cursorPosition = currentLine.length
          term.write(currentLine)
        }
      }
      // Down arrow - next command
      else if (ev.keyCode === 40) {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++
          term.write('\r\x1b[K')
          term.write('\x1b[32mduran@ai\x1b[0m:\x1b[34m~\x1b[0m$ ')
          currentLine = commandHistory[historyIndex]
          cursorPosition = currentLine.length
          term.write(currentLine)
        } else {
          historyIndex = commandHistory.length
          term.write('\r\x1b[K')
          term.write('\x1b[32mduran@ai\x1b[0m:\x1b[34m~\x1b[0m$ ')
          currentLine = ''
          cursorPosition = 0
        }
      }
      // Tab - autocomplete (basic)
      else if (ev.keyCode === 9) {
        ev.preventDefault()
        const commands = ['help', 'ls', 'cat', 'whoami', 'date', 'secrets', 'matrix', 'coffee', 'skills', 'joke', 'quote', 'clear', 'history', 'stats']
        const matches = commands.filter(cmd => cmd.startsWith(currentLine))
        if (matches.length === 1) {
          const remaining = matches[0].slice(currentLine.length)
          currentLine += remaining
          cursorPosition += remaining.length
          term.write(remaining)
        }
      }
      // Printable characters
      else if (printable) {
        currentLine = currentLine.slice(0, cursorPosition) + key + currentLine.slice(cursorPosition)
        cursorPosition++
        term.write(key)
        if (cursorPosition < currentLine.length) {
          term.write(currentLine.slice(cursorPosition))
          for (let i = 0; i < currentLine.length - cursorPosition; i++) {
            term.write('\b')
          }
        }
      }
    })

    return () => {
      term.dispose()
    }
  }, [onClose])

  // Handle ESC key globally
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-5xl h-[700px] bg-[#0a0e27] rounded-xl overflow-hidden shadow-2xl border border-primary/30 flex flex-col animate-in slide-in-from-bottom-4 duration-500">
        {/* Terminal header */}
        <div className="bg-black/50 px-4 py-3 flex items-center justify-between border-b border-primary/20">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              aria-label="Close terminal"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-sm text-white/60 font-mono">terminal — duran@ai:~</div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-white/60" />
          </button>
        </div>

        {/* Terminal body */}
        <div ref={terminalRef} className="flex-1 p-4 overflow-hidden" />

        {/* Terminal footer hint */}
        <div className="bg-black/30 px-4 py-2 border-t border-primary/10">
          <p className="text-xs text-white/40 font-mono text-center">
            💡 Try: <span className="text-primary">help</span>, <span className="text-primary">ls</span>, <span className="text-primary">secrets</span> | Press <span className="text-primary">ESC</span> to close
          </p>
        </div>
      </div>
    </div>
  )
}

export default TerminalEmulator
