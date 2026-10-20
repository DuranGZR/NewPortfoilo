import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, getMessages } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers, Cpu, Calendar } from 'lucide-react';

const SLUG_TO_KEY: Record<string, string> = {
  'aliaga-ai': 'aliagaAI',
  'ai-dream-interpreter': 'aiDreamInterpreter',
  'kayip-qr': 'kayipQR',
  'wedo': 'weDo',
  'real-time-visual-understanding': 'visualAI',
  'aliagaai': 'aliagaAI',
  'kayipqr': 'kayipQR',
  'visual-ai': 'visualAI',
};

const ALL_SLUGS = [
  'aliaga-ai',
  'ai-dream-interpreter',
  'kayip-qr',
  'wedo',
  'real-time-visual-understanding',
];

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const projectKey = SLUG_TO_KEY[slug];
  if (!projectKey) return { title: 'Project Not Found' };

  const messages = (await getMessages({ locale })) as any;
  const project = messages?.projects?.items?.[projectKey];

  return {
    title: project?.title ? `${project.title} | Duran Gezer` : 'Project',
    description: project?.tagline || 'Project Details',
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const projectKey = SLUG_TO_KEY[slug];

  if (!projectKey) {
    notFound();
  }

  const messages = (await getMessages({ locale })) as any;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const project = messages?.projects?.items?.[projectKey];

  if (!project) {
    notFound();
  }

  const features: string[] = project.features || [];
  const tags: string[] = project.tags || [];

  // Previous and next projects
  const currentIndex = ALL_SLUGS.indexOf(slug);
  const prevSlug = currentIndex > 0 ? ALL_SLUGS[currentIndex - 1] : ALL_SLUGS[ALL_SLUGS.length - 1];
  const nextSlug = currentIndex < ALL_SLUGS.length - 1 ? ALL_SLUGS[currentIndex + 1] : ALL_SLUGS[0];

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f3f5f9] pt-28 pb-24 px-4 sm:px-6 relative">
      {/* Background dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/${locale}#projects`}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-white/50 hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToProjects')}
          </Link>
        </div>

        {/* Header Hero */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#819fa7]">
              {project.category || 'Engineering'}
            </span>
            <span className="font-mono text-xs text-white/40 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {project.period || '2024'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#f3f5f9]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-white/10"
              >
                <Github className="w-4 h-4" />
                {t('viewCode')}
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm transition-all duration-200"
              >
                {t('liveDemo')}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Featured Showcase Banner */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-white/10 bg-[#141414] shadow-2xl relative group">
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] max-h-[520px] flex items-center justify-center bg-[#111]">
            <img
              src={project.image || '/projects/aliagaai.png'}
              alt={project.title}
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>

        {/* Grid Sections: Overview & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Left: Overview & Key Features */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <h2 className="text-lg font-bold text-white font-display flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#819fa7]" />
                {t('overview')}
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed whitespace-pre-line">
                {project.overview || project.tagline}
              </p>
            </div>

            {/* Key Features */}
            {features.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white font-display flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  {t('keyFeatures')}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span className="text-sm text-white/80 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Right: Tech Stack & Details */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <h3 className="text-xs font-mono font-semibold text-white/40 tracking-wider uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#819fa7]" />
                {t('techStack')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Info Card */}
            {project.github && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a2327]/40 to-transparent border border-[#819fa7]/20 space-y-3">
                <div className="font-mono text-xs text-[#819fa7] uppercase font-semibold">
                  {locale === 'tr' ? 'Açık Kaynak Kod' : 'Open Source'}
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  {locale === 'tr'
                    ? 'Bu projenin kaynak kodlarını, mimari diyagramlarını ve dokümantasyonunu GitHub üzerinde inceleyebilirsiniz.'
                    : 'Explore the source code, architecture diagrams, and complete documentation on GitHub.'}
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#819fa7] transition-colors"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation: Next / Prev Projects */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href={`/${locale}/projects/${prevSlug}`}
            className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {locale === 'tr' ? 'Önceki Proje' : 'Previous Project'}
          </Link>
          <Link
            href={`/${locale}/projects/${nextSlug}`}
            className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
          >
            {locale === 'tr' ? 'Sonraki Proje' : 'Next Project'}
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>
      </div>
    </main>
  );
}
