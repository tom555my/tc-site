import { motion } from 'framer-motion';
import {
	SiAmazonwebservices,
	SiClaude,
	SiCloudflare,
	SiCloudflareworkers,
	SiDocker,
	SiExpo,
	SiExpress,
	SiGit,
	SiGooglecloud,
	SiHasura,
	SiHono,
	SiHuggingface,
	SiJavascript,
	SiKoa,
	SiKubernetes,
	SiMariadb,
	SiMongodb,
	SiMysql,
	SiN8N,
	SiNextdotjs,
	SiNodedotjs,
	SiOllama,
	SiOpensearch,
	SiPandas,
	SiPostgresql,
	SiPython,
	SiReact,
	SiReactrouter,
	SiSst,
	SiTypescript,
	SiVercel,
} from 'react-icons/si';
import {
	fadeInScale,
	springs,
	staggerContainer,
	tapScale,
} from '../lib/animations';
import { Codex } from './icons/codex';
import { Conductor } from './icons/conductor';
import { Langfuse } from './icons/langfuse';
import { Mastra } from './icons/mastra';
import { OpenCode } from './icons/opencode';

const skillCategories = [
	{
		title: 'AI',
		skills: [
			{ name: 'Codex', icon: Codex },
			{ name: 'Claude Code', icon: SiClaude },
			{ name: 'OpenCode', icon: OpenCode },
			{ name: 'Conductor', icon: Conductor },
			{ name: 'Mastra', icon: Mastra },
			{ name: 'Langfuse', icon: Langfuse },
			{ name: 'RAG Applications', icon: SiHuggingface },
			{ name: 'Ollama', icon: SiOllama },
			{ name: 'AI SDK', icon: SiVercel },
		],
	},
	{
		title: 'Languages & Frameworks',
		skills: [
			{ name: 'JavaScript', icon: SiJavascript },
			{ name: 'TypeScript', icon: SiTypescript },
			{ name: 'Node.js', icon: SiNodedotjs },
			{ name: 'React.js', icon: SiReact },
			{ name: 'Next.js', icon: SiNextdotjs },
			{ name: 'React Router', icon: SiReactrouter },
			{ name: 'React Native', icon: SiReact },
			{ name: 'Hono', icon: SiHono },
			{ name: 'ExpressJS', icon: SiExpress },
			{ name: 'Koa.js', icon: SiKoa },
			{ name: 'Python', icon: SiPython },
			{ name: 'Pandas', icon: SiPandas },
		],
	},
	{
		title: 'Databases',
		skills: [
			{ name: 'MySQL', icon: SiMysql },
			{ name: 'Postgresql', icon: SiPostgresql },
			{ name: 'MongoDB', icon: SiMongodb },
			{ name: 'MariaDB', icon: SiMariadb },
			{ name: 'OpenSearch', icon: SiOpensearch },
			{ name: 'D1 (SQLite)', icon: SiCloudflare },
		],
	},
	{
		title: 'Cloud & Infrastructure',
		skills: [
			{ name: 'AWS (CDK, SQS, S3...)', icon: SiAmazonwebservices },
			{ name: 'SST.dev', icon: SiSst },
			{ name: 'Docker', icon: SiDocker },
			{ name: 'Kubernetes', icon: SiKubernetes },
			{ name: 'GCP Cloud Function', icon: SiGooglecloud },
			{ name: 'Cloudflare Workers', icon: SiCloudflareworkers },
		],
	},
	{
		title: 'Tools',
		skills: [
			{ name: 'Git', icon: SiGit },
			{ name: 'Vercel', icon: SiVercel },
			{ name: 'n8n', icon: SiN8N },
			{ name: 'Expo', icon: SiExpo },
			{ name: 'Hasura (GraphQL)', icon: SiHasura },
		],
	},
];

export function Skills() {
	return (
		<motion.div
			className="grid grid-cols-1 md:grid-cols-2 gap-8"
			variants={staggerContainer}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-50px' }}
		>
			{skillCategories.map((cat) => (
				<motion.div
					key={cat.title}
					variants={fadeInScale}
					className="border border-white/5 rounded-lg p-5 bg-surface-1 hover:border-white/10 transition-colors"
					whileHover={{
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
						y: -2,
						transition: springs.snappy,
					}}
				>
					<h3 className="text-xs font-semibold text-muted/40 uppercase tracking-widest mb-4">
						{cat.title}
					</h3>
					<div className="flex flex-wrap gap-2">
						{cat.skills.map((skill) => (
							<motion.span
								key={skill.name}
								className="flex items-center gap-2 text-[13px] text-muted/80 px-2.5 py-1.5 rounded bg-white/[0.03] border border-white/5 cursor-default"
								whileHover={{
									scale: 1.05,
									borderColor: 'rgba(227, 100, 20, 0.3)',
									color: 'rgba(227, 100, 20, 0.9)',
									backgroundColor: 'rgba(227, 100, 20, 0.05)',
									transition: springs.snappy,
								}}
								whileTap={tapScale}
							>
								<motion.div
									whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
								>
									<skill.icon className="w-3.5 h-3.5" />
								</motion.div>
								{skill.name}
							</motion.span>
						))}
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
