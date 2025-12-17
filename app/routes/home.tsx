import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';

export function meta() {
	return [
		{ title: 'Tommy Chung | Full-Stack AI Developer' },
		{
			name: 'description',
			content:
				'Portfolio of Tommy Chung - Full-Stack AI Developer & Data Science Engineer',
		},
	];
}

export default function Home() {
	return (
		<div className="space-y-24">
			<Hero />

			<section>
				<h2 className="text-sm font-semibold text-accent-blue uppercase tracking-widest mb-12 border-b border-white/5 pb-2">
					Experience
				</h2>
				<Experience />
			</section>

			<section>
				<h2 className="text-sm font-semibold text-accent-blue uppercase tracking-widest mb-12 border-b border-white/5 pb-2">
					Projects
				</h2>
				<Projects />
			</section>

			<section>
				<h2 className="text-sm font-semibold text-accent-blue uppercase tracking-widest mb-12 border-b border-white/5 pb-2">
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
