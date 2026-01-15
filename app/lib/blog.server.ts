// Import blog posts from virtual module created by Vite plugin
// This works in both dev and production (including Cloudflare Workers)
import allPosts from 'virtual:blog-posts';

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
	return allPosts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	return allPosts.find((post) => post.slug === slug) || null;
}
