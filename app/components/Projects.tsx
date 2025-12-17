import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
	{
		title: 'Luxury Marketplace App',
		description:
			'Built and deployed iOS/Android mobile app with Expo. Built API server with Hasura (GraphQL API) and Postgresql.',
		status: 'Completed',
		tags: ['Expo', 'React Native', 'Hasura', 'Postgresql'],
		type: 'Freelance',
	},
	{
		title: 'Group Expenses Calculator (Web)',
		description:
			'Experiment to explore developing applications on Cloudflare. Built with Remix.run, Cloudflare Pages/D1 (SQLite).',
		status: 'Live',
		tags: ['Remix', 'Cloudflare Pages', 'D1', 'Durable Objects'],
		type: 'Side Project',
		demo: 'https://splity.io',
	},
];

export function Projects() {
	return (
		<div className="space-y-8">
			{projects.map((project, index) => (
				<motion.div
					key={project.title}
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
					className="group"
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
						<div className="flex items-center gap-4 text-muted/40 group-hover:text-muted transition-colors">
							{project.demo && (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white transition-colors"
								>
									<ExternalLink size={16} />
								</a>
							)}
						</div>
					</div>
					<p className="text-sm text-muted/70 mb-4 leading-relaxed">
						{project.description}
					</p>
					<div className="flex flex-wrap gap-2 mb-6">
						{project.tags.map((tag) => (
							<span
								key={tag}
								className="text-[10px] uppercase tracking-tighter text-muted/40 border border-white/5 px-2 py-0.5 rounded"
							>
								{tag}
							</span>
						))}
					</div>
					{index !== projects.length - 1 && (
						<div className="h-px bg-white/5 w-full" />
					)}
				</motion.div>
			))}
		</div>
	);
}
