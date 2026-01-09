import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/project/ProjectDetail';
import { projects } from '@/data/projects';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://durangezer.dev';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Duran Gezer`,
    description: project.oneLiner,
    openGraph: {
      type: 'article',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url: `${siteUrl}/${locale}/projects/${slug}`,
      title: project.title,
      description: project.oneLiner,
      siteName: 'Duran Gezer Portfolio',
      images: [
        {
          url: project.thumbnail || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.oneLiner,
      images: [project.thumbnail || '/og-image.jpg'],
    },
    keywords: project.tags.join(', '),
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
