import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug, type BlogPost as BlogPostType } from '../lib/blog.server';
import { fadeInUp, springs } from '../lib/animations';
import { Suspense, lazy } from 'react';

interface LoaderArgs {
	params: {
		slug: string;
	};
}

export async function loader({ params }: LoaderArgs) {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw new Response('Not Found', { status: 404 });
	}

	return { post };
}

export function meta({ data }: { data?: { post?: BlogPostType } }) {
	if (!data?.post) {
		return [{ title: 'Post Not Found | Tommy Chung' }];
	}

	return [
		{ title: `${data.post.title} | Tommy Chung` },
		{ name: 'description', content: data.post.excerpt },
	];
}

interface BlogPostProps {
	loaderData: {
		post: BlogPostType;
	};
}

export default function BlogPost({ loaderData }: BlogPostProps) {
	const { post } = loaderData;

	// Dynamically import the MDX content
	const Content = lazy(() => import(`../../content/blog/${post.slug}.mdx`));

	return (
		<div className="space-y-8">
			<motion.a
				href="/blog"
				className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors cursor-pointer"
				initial={{ opacity: 0, x: -10 }}
				animate={{ opacity: 1, x: 0 }}
				whileHover={{ x: -4, transition: springs.snappy }}
			>
				<ArrowLeft className="w-4 h-4" />
				Back to blog
			</motion.a>

			<motion.article
				className="prose prose-invert max-w-none"
				variants={fadeInUp}
				initial="hidden"
				animate="visible"
			>
				<header className="mb-8 pb-8 border-b border-white/10">
					<h1 className="text-3xl font-bold tracking-tight mb-3">
						{post.title}
					</h1>
					<div className="flex items-center gap-4 text-sm text-muted/60">
						<time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
						<span>•</span>
						<div className="flex gap-2">
							{post.tags.map((tag: string) => (
								<span
									key={tag}
									className="text-[10px] uppercase text-primary/70"
								>
									#{tag}
								</span>
							))}
						</div>
					</div>
				</header>

				<Suspense fallback={<div className="text-muted">Loading...</div>}>
					<Content />
				</Suspense>
			</motion.article>
		</div>
	);
}
