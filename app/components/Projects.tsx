import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import {
	fadeInUp,
	staggerContainer,
	springs,
	tapScale,
} from '../lib/animations';

const projects: {
	title: string;
	description: string;
	status: 'Live' | 'Completed' | 'In Progress';
	tags: string[];
	type: 'Freelance' | 'Side Project' | 'Work Project';
	links?: {
		demo?: string;
		github?: string;
	};
}[] = [
	{
		title: 'Amoeba 28 (Luxury Marketplace App)',
		description:
			'Built and deployed iOS/Android mobile app with Expo. Built API server with Hasura (GraphQL API) and Postgresql.',
		status: 'Completed',
		tags: ['Expo', 'React Native', 'Hasura', 'Postgresql'],
		type: 'Freelance',
		links: {
			demo: 'https://apps.apple.com/us/app/amoeba-28/id1630974085',
		},
	},
	{
		title: 'Splity.io (Group Expenses Calculator)',
		description:
			'Experiment to explore developing applications on Cloudflare. Built with React Router v7, Cloudflare Worker, D1 (SQLite).',
		status: 'Live',
		tags: ['React Router v7', 'Cloudflare Worker', 'D1', 'Durable Objects'],
		type: 'Side Project',
		links: {
			demo: 'https://splity.io',
		},
	},
	{
		title: 'skills-browser',
		description:
			'A browser automation toolkit for interacting with and testing web applications using AI agents.',
		status: 'In Progress',
		tags: ['Browser', 'AI', 'Automation'],
		type: 'Side Project',
		links: {
			github: 'https://github.com/tom555my/skills-browser',
		},
	},
];

export function Projects() {
	return (
		<motion.div
			className="space-y-8"
			variants={staggerContainer}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-50px' }}
		>
			{projects.map((project) => (
				<motion.div key={project.title} variants={fadeInUp} className="group">
					<motion.div
						className="border border-white/5 rounded-lg p-6 bg-surface-1 hover:bg-surface-2 transition-colors"
						whileHover={{
							y: -4,
							boxShadow: '0 8px 20px rgba(227, 100, 20, 0.1)',
							borderColor: 'rgba(227, 100, 20, 0.2)',
							transition: springs.snappy,
						}}
					>
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-3">
								<h3 className="text-white font-semibold group-hover:text-primary transition-colors">
									{project.title}
								</h3>
								<span
									className={`w-1.5 h-1.5 rounded-full ${project.status === 'Live' || project.status === 'Completed' ? 'bg-accent-green' : 'bg-accent-orange'}`}
								/>
							</div>
							<div className="flex items-center gap-4">
								{project.links?.demo && (
									<motion.a
										href={project.links.demo}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted/40 hover:text-primary transition-colors cursor-pointer"
										aria-label={`View live demo of ${project.title}`}
										whileHover={{ scale: 1.15, rotate: 5 }}
										whileTap={tapScale}
									>
										<ExternalLink className="w-4 h-4" />
									</motion.a>
								)}
								{project.links?.github && (
									<motion.a
										href={project.links.github}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted/40 hover:text-primary transition-colors cursor-pointer"
										aria-label={`View source code of ${project.title} on GitHub`}
										whileHover={{ scale: 1.15, rotate: 5 }}
										whileTap={tapScale}
									>
										<Github className="w-4 h-4" />
									</motion.a>
								)}
							</div>
						</div>
						<p className="text-sm text-muted/70 mb-4 leading-relaxed">
							{project.description}
						</p>
						<div className="flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<motion.span
									key={tag}
									className="text-[10px] uppercase tracking-tighter text-muted/40 border border-white/5 px-2 py-0.5 rounded cursor-default"
									whileHover={{
										scale: 1.05,
										borderColor: 'rgba(227, 100, 20, 0.3)',
										color: 'rgba(227, 100, 20, 0.8)',
										transition: springs.snappy,
									}}
								>
									{tag}
								</motion.span>
							))}
						</div>
					</motion.div>
				</motion.div>
			))}
		</motion.div>
	);
}
