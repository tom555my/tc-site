import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

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
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
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
				initial={{ opacity: 0, x: 10 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="flex flex-col gap-3"
			>
				{socialLinks.map((link) => (
					<a
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-3 text-sm text-muted hover:text-white transition-colors"
					>
						<link.icon className="w-4 h-4" />
						<span className="border-b border-transparent group-hover:border-white/20 pb-0.5">
							{link.label}
						</span>
					</a>
				))}
			</motion.div>
		</div>
	);
}
