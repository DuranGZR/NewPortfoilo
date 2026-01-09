"use client";

import { useEffect, useState, createElement } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home, 
  FolderOpen, 
  Code, 
  Briefcase, 
  Map, 
  MessageSquare,
  User,
  Lightbulb,
  Brain,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  category: 'navigation' | 'social' | 'actions';
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'home',
      label: 'Go to Home',
      icon: Home,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      category: 'navigation'
    },
    {
      id: 'about',
      label: 'About Me',
      icon: User,
      action: () => scrollToSection('about'),
      category: 'navigation'
    },
    {
      id: 'projects',
      label: 'View Projects',
      icon: FolderOpen,
      action: () => scrollToSection('projects'),
      category: 'navigation'
    },
    {
      id: 'skills',
      label: 'My Skills',
      icon: Code,
      action: () => scrollToSection('skills'),
      category: 'navigation'
    },
    {
      id: 'ml-visualizer',
      label: 'ML Model Visualizer',
      icon: Brain,
      action: () => scrollToSection('ml-visualizer'),
      category: 'navigation'
    },
    {
      id: 'experience',
      label: 'Experience & Education',
      icon: Briefcase,
      action: () => scrollToSection('experience'),
      category: 'navigation'
    },
    {
      id: 'thinking',
      label: 'Engineering Thinking',
      icon: Lightbulb,
      action: () => scrollToSection('thinking'),
      category: 'navigation'
    },
    {
      id: 'roadmap',
      label: 'Career Roadmap',
      icon: Map,
      action: () => scrollToSection('roadmap'),
      category: 'navigation'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: MessageSquare,
      action: () => scrollToSection('ai-assistant'),
      category: 'navigation'
    },
    // Social
    {
      id: 'github',
      label: 'Open GitHub',
      icon: Github,
      action: () => window.open('https://github.com/durangezer', '_blank'),
      category: 'social'
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      icon: Linkedin,
      action: () => window.open('https://linkedin.com/in/durangezer', '_blank'),
      category: 'social'
    },
    {
      id: 'email',
      label: 'Send Email',
      icon: Mail,
      action: () => window.location.href = 'mailto:your.email@example.com',
      category: 'social'
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const navigationCommands = filteredCommands.filter(c => c.category === 'navigation');
  const socialCommands = filteredCommands.filter(c => c.category === 'social');

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101]"
          >
            <Command className="rounded-2xl border border-[#819fa7]/30 bg-[#0d0d0d]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-[#819fa7]/20">
                <Search className="w-5 h-5 text-[#819fa7]" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-[#f3f5f9] placeholder:text-[#f3f5f9]/40 text-base"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#819fa7] bg-[#819fa7]/10 rounded border border-[#819fa7]/20">
                  ESC
                </kbd>
              </div>

              {/* Command List */}
              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-12 text-center text-sm text-[#f3f5f9]/50">
                  No results found.
                </Command.Empty>

                {/* Navigation Commands */}
                {navigationCommands.length > 0 && (
                  <Command.Group heading="Navigation" className="px-2 py-2">
                    <div className="text-xs font-semibold text-[#819fa7] uppercase tracking-wider mb-2 px-2">
                      Navigation
                    </div>
                    {navigationCommands.map((cmd) => {
                      return (
                        <Command.Item
                          key={cmd.id}
                          onSelect={() => cmd.action()}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-[#819fa7]/10 transition-colors group data-[selected=true]:bg-[#819fa7]/15"
                        >
                          {createElement(cmd.icon, { className: "w-4 h-4 text-[#819fa7] group-hover:text-[#f3f5f9] transition-colors" })}
                          <span className="text-sm text-[#f3f5f9] group-hover:text-[#f3f5f9] font-medium">
                            {cmd.label}
                          </span>
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                )}

                {/* Social Commands */}
                {socialCommands.length > 0 && (
                  <Command.Group heading="Social" className="px-2 py-2 mt-2">
                    <div className="text-xs font-semibold text-[#819fa7] uppercase tracking-wider mb-2 px-2">
                      Social & Contact
                    </div>
                    {socialCommands.map((cmd) => {
                      return (
                        <Command.Item
                          key={cmd.id}
                          onSelect={() => cmd.action()}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-[#819fa7]/10 transition-colors group data-[selected=true]:bg-[#819fa7]/15"
                        >
                          {createElement(cmd.icon, { className: "w-4 h-4 text-[#819fa7] group-hover:text-[#f3f5f9] transition-colors" })}
                          <span className="text-sm text-[#f3f5f9] group-hover:text-[#f3f5f9] font-medium">
                            {cmd.label}
                          </span>
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                )}
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#819fa7]/20 bg-[#1a1a1a]/50">
                <div className="flex items-center gap-4 text-xs text-[#f3f5f9]/50">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-[#819fa7]/10 rounded border border-[#819fa7]/20 text-[#819fa7]">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-[#819fa7]/10 rounded border border-[#819fa7]/20 text-[#819fa7]">↵</kbd>
                    Select
                  </span>
                </div>
                <div className="text-xs text-[#f3f5f9]/50">
                  Press <kbd className="px-1.5 py-0.5 bg-[#819fa7]/10 rounded border border-[#819fa7]/20 text-[#819fa7]">⌘K</kbd> anytime
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
