import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { fadeInUp, slideInRight, springs, tapScale } from '../lib/animations';

const socialLinks = [
	{ icon: Globe, href: 'https://tommy-chung.com', label: 'website' },
	{ icon: Mail, href: 'mailto:tc@tommy-chung.com', label: 'email' },
	{ icon: Github, href: 'https://github.com/tom555my', label: 'github' },
	{
		icon: Linkedin,
		href: 'https://linkedin.com/in/tommy-chung-kwok-cheong',
		label: 'linkedin',
	},
];

export function Hero() {
	return (
		<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
			<motion.div
				variants={fadeInUp}
				initial="hidden"
				animate="visible"
				className="flex-1"
			>
				<h1 className="text-3xl font-bold tracking-tight mb-2">Tommy Chung</h1>
				<p className="text-lg text-muted mb-4">Full-Stack AI Developer</p>
				<p className="text-sm text-muted/80 max-w-md">
					Based in Toronto, Canada. Senior Data Science Engineer at Robots and
					Pencils. Passionate about Generative AI, Web Development, and building
					scalable solutions.
				</p>
			</motion.div>

			<motion.div
				variants={slideInRight}
				initial="hidden"
				animate="visible"
				className="flex flex-col gap-3"
			>
				{socialLinks.map((link) => (
					<motion.a
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-3 text-sm text-muted hover:text-white transition-colors cursor-pointer px-3 py-2 -mx-3 rounded-md hover:bg-white/[0.03]"
						whileHover={{ x: 4, transition: springs.snappy }}
						whileTap={tapScale}
					>
						<motion.div
							className="w-4 h-4"
							whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
						>
							<link.icon className="w-full h-full" />
						</motion.div>
						<span className="border-b border-transparent group-hover:border-white/20 pb-0.5">
							{link.label}
						</span>
					</motion.a>
				))}
			</motion.div>
		</div>
	);
}
