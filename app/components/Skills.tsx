import { motion } from 'framer-motion';
import type { SVGProps } from 'react';
import {
	SiJavascript,
	SiTypescript,
	SiNodedotjs,
	SiReact,
	SiNextdotjs,
	SiReactrouter,
	SiExpress,
	SiKoa,
	SiPython,
	SiPandas,
	SiMysql,
	SiPostgresql,
	SiMongodb,
	SiMariadb,
	SiCloudflare,
	SiAmazonwebservices,
	SiDocker,
	SiKubernetes,
	SiGooglecloud,
	SiGit,
	SiVercel,
	SiN8N,
	SiExpo,
	SiHasura,
	SiSst,
	SiOpenai,
	SiAnthropic,
	SiHuggingface,
	SiOllama,
} from 'react-icons/si';
import {
	fadeInScale,
	staggerContainer,
	springs,
	tapScale,
} from '../lib/animations';

function LangfuseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="60 91 456 286" fill="none" aria-hidden="true" {...props}>
			<path
				d="M286.292 286.105L320.889 313.896C320.889 313.896 347.362 294.235 366.83 291.351C387.248 288.326 409.032 299.71 429.218 313.281C459.707 333.779 485.367 359.789 485.367 359.789L515.427 330.296C515.427 330.296 432.548 240.501 366.83 248.624C323.725 253.952 286.292 286.105 286.292 286.105Z"
				fill="currentColor"
			/>
			<path
				d="M88.3582 114.862L60 146.056C60 146.056 139.009 219.788 201.224 219.788C229.582 219.788 268.908 197.572 302.747 168.709C322.03 152.261 343.582 133.579 365.135 133.579C379.622 133.579 398.729 141.252 416.747 161.403C416.747 161.403 428.377 154.429 435.463 149.418C441.691 145.014 450.942 137.508 450.942 137.508C425.024 109.845 387.535 89.6251 365.135 91.6083C328.836 91.6127 302.747 114.209 270.418 140.343C238.09 166.477 224.478 177.25 201.224 177.25C162.09 177.25 88.3582 114.862 88.3582 114.862Z"
				fill="currentColor"
			/>
			<path
				d="M88.3582 352.463L60 321.269C60 321.269 139.009 247.537 201.224 247.537C229.582 247.537 268.908 269.753 302.747 298.616C322.03 315.064 343.582 333.746 365.135 333.746C379.691 333.746 398.653 325.757 416.747 305.388C416.747 305.388 427.624 312.093 434.329 316.732C441.223 321.501 451.344 329.387 451.344 329.387C425.413 357.27 387.651 377.71 365.135 375.717C328.836 375.712 307.284 356.477 274.956 330.343C242.627 304.21 224.478 290.075 201.224 290.075C162.09 290.075 88.3582 352.463 88.3582 352.463Z"
				fill="currentColor"
			/>
			<path
				d="M458.142 185.149C450.764 190.249 438.859 197.627 438.859 197.627C438.859 197.627 445.665 212.373 445.665 232.224C445.665 252.075 439.426 269.09 439.426 269.09C439.426 269.09 450.114 275.765 457.008 280.433C464.17 285.282 475.157 293.478 475.157 293.478C475.157 293.478 488.202 266.254 488.202 232.224C488.202 198.194 475.157 172.672 475.157 172.672C475.157 172.672 464.921 180.464 458.142 185.149Z"
				fill="currentColor"
			/>
			<path
				d="M287.995 180.612L320.89 153.388C320.89 153.388 347.363 172.434 366.831 175.318C387.248 178.344 409.033 166.959 429.219 153.388C459.708 132.89 485.368 106.881 485.368 106.881L515.428 136.373C515.428 136.373 432.549 226.168 366.831 218.045C323.726 212.717 287.995 180.612 287.995 180.612Z"
				fill="currentColor"
			/>
			<path
				d="M208.601 91.0002C251.139 91.0002 286.865 127.299 286.865 127.299C286.865 127.299 276.924 135.131 270.417 140.344C263.64 145.773 252.835 154.523 252.835 154.523C252.835 154.523 234.124 134.672 208.601 134.672C198.136 134.672 184.535 140.958 170.034 153.388C158.846 162.979 147.205 174.902 139.407 189.687C132.664 202.471 128.987 217.537 128.631 233.359C128.185 253.232 135.228 274.063 146.78 290.642C154.523 301.754 163.763 310.116 173.437 317.299C185.992 326.621 199.085 333.18 208.601 333.18C218.767 333.18 227.907 329.647 234.691 326.374C245.467 320.135 253.969 312.762 253.969 312.762L287.432 340.553C287.432 340.553 273.82 354.165 255.109 364.374C243.018 370.337 227.477 376.284 208.601 376.284C189.739 376.284 167.834 366.262 147.347 350.762C134.103 340.741 121.122 328.867 111.049 314.463C94.5398 290.856 86.0322 262.135 86.0888 233.359C86.1461 204.223 95.54 175.366 112.183 151.687C138.273 117.657 176.86 91.0002 208.601 91.0002Z"
				fill="currentColor"
			/>
		</svg>
	);
}

const skillCategories = [
	{
		title: 'AI',
		skills: [
			{ name: 'OpenAI APIs', icon: SiOpenai },
			{ name: 'Anthropic APIs', icon: SiAnthropic },
			{ name: 'Codex', icon: SiOpenai },
			{ name: 'Claude Code', icon: SiAnthropic },
			{ name: 'Langfuse', icon: LangfuseIcon },
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
			{ name: 'Cloudflare', icon: SiCloudflare },
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
