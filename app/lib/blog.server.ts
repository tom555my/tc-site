import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	content: string;
}

// Use process.cwd() which always points to project root
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export async function getAllPosts(): Promise<BlogPost[]> {
	// Check if directory exists
	if (!fs.existsSync(BLOG_DIR)) {
		console.error('Blog directory not found at:', BLOG_DIR);
		console.error('Current working directory:', process.cwd());
		console.error('Directory exists?', fs.existsSync(BLOG_DIR));
		return [];
	}

	const files = fs.readdirSync(BLOG_DIR);

	const posts = files
		.filter((file: string) => file.endsWith('.mdx'))
		.map((file: string) => {
			const slug = file.replace('.mdx', '');
			const filePath = path.join(BLOG_DIR, file);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const { data, content } = matter(fileContent);

			return {
				slug,
				title: data.title as string,
				date: data.date as string,
				excerpt: data.excerpt as string,
				tags: (data.tags as string[]) || [],
				content,
			};
		})
		.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(fileContent);

		return {
			slug,
			title: data.title as string,
			date: data.date as string,
			excerpt: data.excerpt as string,
			tags: (data.tags as string[]) || [],
			content,
		};
	} catch {
		return null;
	}
}
