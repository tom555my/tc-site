import { motion } from 'motion/react';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import {
	getPostBySlug,
	type BlogPost as BlogPostType,
} from '../lib/blog.server';
import { fadeInUp, springs } from '../lib/animations';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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

	const post = data.post;
	const siteUrl = 'https://tommy-chung.com';
	const postUrl = `${siteUrl}/blog/${post.slug}`;
	const ogImageUrl = `${siteUrl}/og-image/${post.slug}`;

	const articleTags = post.tags
		? post.tags.map((tag: string) => ({
				property: 'article:tag',
				content: tag,
			}))
		: [];

	return [
		{ title: `${post.title} | Tommy Chung` },
		{ name: 'description', content: post.excerpt },
		{ name: 'keywords', content: post.tags ? post.tags.join(', ') : '' },
		{ name: 'author', content: 'Tommy Chung' },
		{ name: 'publish_date', content: post.date },
		{
			property: 'og:type',
			content: 'article',
		},
		{
			property: 'og:title',
			content: `${post.title} | Tommy Chung`,
		},
		{
			property: 'og:description',
			content: post.excerpt,
		},
		{
			property: 'og:image',
			content: ogImageUrl,
		},
		{
			property: 'og:url',
			content: postUrl,
		},
		{
			property: 'article:author',
			content: 'Tommy Chung',
		},
		{
			property: 'article:published_time',
			content: post.date,
		},
		{
			property: 'article:section',
			content: 'Technology',
		},
		...articleTags,
		{
			name: 'twitter:card',
			content: 'summary_large_image',
		},
		{
			name: 'twitter:title',
			content: `${post.title} | Tommy Chung`,
		},
		{
			name: 'twitter:description',
			content: post.excerpt,
		},
		{
			name: 'twitter:image',
			content: ogImageUrl,
		},
		{
			name: 'twitter:creator',
			content: '@tommychung',
		},
	];
}

interface BlogPostProps {
	loaderData: {
		post: BlogPostType;
	};
}

export default function BlogPost({ loaderData }: BlogPostProps) {
	const { post } = loaderData;

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

				<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
					{post.content}
				</ReactMarkdown>
			</motion.article>
		</div>
	);
}
