import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Link } from 'react-router';

export function meta() {
	return [
		{ title: 'Tommy Chung | Full-Stack AI Developer & Data Scientist' },
		{
			name: 'description',
			content:
				'Senior Data Engineer & full-stack developer building scalable AI solutions. Explore projects, experience, and insights on React, TypeScript, and cloud infrastructure.',
		},
		{
			name: 'keywords',
			content:
				'full-stack developer, AI developer, data science engineer, React, TypeScript, Cloudflare, AWS, web development, Toronto',
		},
		{
			name: 'author',
			content: 'Tommy Chung',
		},
		{
			property: 'og:type',
			content: 'website',
		},
		{
			property: 'og:title',
			content: 'Tommy Chung | Full-Stack AI Developer & Data Scientist',
		},
		{
			property: 'og:description',
			content:
				'Senior Data Engineer & full-stack developer building scalable AI solutions. Explore projects, experience, and insights on React, TypeScript, and cloud infrastructure.',
		},
		{
			property: 'og:image',
			content: 'https://tommy-chung.com/og-image-home',
		},
		{
			property: 'og:url',
			content: 'https://tommy-chung.com/',
		},
		{
			name: 'twitter:card',
			content: 'summary_large_image',
		},
		{
			name: 'twitter:title',
			content: 'Tommy Chung | Full-Stack AI Developer & Data Scientist',
		},
		{
			name: 'twitter:description',
			content:
				'Senior Data Engineer & full-stack developer building scalable AI solutions. Explore projects, experience, and insights on React, TypeScript, and cloud infrastructure.',
		},
		{
			name: 'twitter:image',
			content: 'https://tommy-chung.com/og-image-home',
		},
	];
}

export default function Home() {
	return (
		<div className="space-y-24">
			<nav className="flex gap-6 mb-8 pb-4 border-b border-white/5">
				<Link
					to="/"
					className="text-sm font-medium text-white transition-colors"
				>
					Home
				</Link>
				<Link
					to="/blog"
					className="text-sm text-muted hover:text-white transition-colors"
				>
					Blog
				</Link>
        <a
					href="/llms.txt"
					className="text-sm text-muted hover:text-white transition-colors ml-auto"
				>
					llms.txt
				</a>
			</nav>
			<Hero />

			<section>
				<h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-12 border-b border-white/5 pb-2">
					Experience
				</h2>
				<Experience />
			</section>

			<section>
				<h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-12 border-b border-white/5 pb-2">
					Projects
				</h2>
				<Projects />
			</section>

			<section>
				<h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-12 border-b border-white/5 pb-2">
					Skills
				</h2>
				<Skills />
			</section>

			<footer className="pt-24 pb-12 text-center text-[11px] text-muted/30 uppercase tracking-[0.2em]">
				© {new Date().getFullYear()} Tommy Chung • Built with React Router &
				Tailwind
			</footer>
		</div>
	);
}
