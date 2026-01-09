import Hero from '@/components/sections/Hero/Hero'
import About from '@/components/sections/About/About'
import Projects from '@/components/sections/Projects/Projects'
import Skills from '@/components/sections/Skills/Skills'
import Experience from '@/components/sections/Experience/Experience'
import Thinking from '@/components/sections/Thinking/Thinking'
import Roadmap from '@/components/sections/Roadmap/Roadmap'
import AIAssistant from '@/components/sections/AIAssistant/AIAssistant'
import SectionDivider from '@/components/widgets/SectionDivider'
import ScrollProgress from '@/components/widgets/ScrollProgress'
import BackToTop from '@/components/widgets/BackToTop'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <main className="min-h-screen">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Thinking />
        <SectionDivider />
        <Roadmap />
        <SectionDivider />
        <AIAssistant />
      </main>
    </>
  )
}
