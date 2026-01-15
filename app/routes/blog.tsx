import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getAllPosts, type BlogPost } from '../lib/blog.server';
import { fadeInUp, staggerContainer, springs } from '../lib/animations';
import { Link } from 'react-router';

export async function loader() {
	const posts = await getAllPosts();
	return { posts };
}

export function meta() {
	return [
		{ title: 'Blog | Tommy Chung' },
		{
			name: 'description',
			content: 'Thoughts on AI, web development, and technology.',
		},
	];
}

interface BlogProps {
	loaderData: {
		posts: BlogPost[];
	};
}

export default function Blog({ loaderData }: BlogProps) {
	const { posts } = loaderData;

	return (
		<div className="space-y-12">
			<nav className="flex gap-6 mb-8 pb-4 border-b border-white/5">
				<Link
					to="/"
					className="text-sm text-muted hover:text-white transition-colors"
				>
					Home
				</Link>
				<Link
					to="/blog"
					className="text-sm font-medium text-white transition-colors"
				>
					Blog
				</Link>
			</nav>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
				<p className="text-muted">
					Thoughts on AI, web development, and building things.
				</p>
			</motion.div>

			{posts.length === 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-12 text-muted/60"
				>
					No blog posts yet. Check back soon!
				</motion.div>
			) : (
				<motion.div
					className="space-y-8"
					variants={staggerContainer}
					initial="hidden"
					animate="visible"
				>
					{posts.map((post: BlogPost) => (
						<motion.a
							key={post.slug}
							href={`/blog/${post.slug}`}
							variants={fadeInUp}
							className="block group border border-white/5 rounded-lg p-6 bg-surface-1 hover:bg-surface-2 hover:border-white/10 transition-colors cursor-pointer"
							whileHover={{
								y: -4,
								boxShadow: '0 8px 20px rgba(227, 100, 20, 0.1)',
								borderColor: 'rgba(227, 100, 20, 0.2)',
								transition: springs.snappy,
							}}
						>
							<div className="flex items-center justify-between mb-2">
								<h2 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
									{post.title}
								</h2>
								<time className="text-xs text-muted/60 font-mono">
									{format(new Date(post.date), 'MMM d, yyyy')}
								</time>
							</div>
							<p className="text-sm text-muted/80 mb-4 leading-relaxed">
								{post.excerpt}
							</p>
							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag: string) => (
									<span
										key={tag}
										className="text-[10px] uppercase text-muted/40 border border-white/5 px-2 py-0.5 rounded"
									>
										{tag}
									</span>
								))}
							</div>
						</motion.a>
					))}
				</motion.div>
			)}
		</div>
	);
}
