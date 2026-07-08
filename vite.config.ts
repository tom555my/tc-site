import { reactRouter } from '@react-router/dev/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { markdownToHtml } from 'satteri';
import expressiveCode from 'satteri-expressive-code';

// Custom Vite plugin to provide blog posts as a virtual module.
// Markdown is rendered to HTML at build time with Sätteri and Expressive Code.
function blogPostsPlugin() {
	const virtualModuleId = 'virtual:blog-posts';
	const resolvedVirtualModuleId = '\0' + virtualModuleId;

	return {
		name: 'blog-posts-plugin',
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		async load(id: string) {
			if (id === resolvedVirtualModuleId) {
				// Read blog posts at build time using Node.js fs
				const blogDir = path.join(__dirname, 'content', 'blog');
				const files = fs.readdirSync(blogDir);

				const posts = await Promise.all(
					files
						.filter((file) => file.endsWith('.mdx'))
						.map(async (file) => {
							const slug = file.replace('.mdx', '');
							const filePath = path.join(blogDir, file);
							const fileContent = fs.readFileSync(filePath, 'utf-8');
							const { data, content } = matter(fileContent);

							const { html } = await markdownToHtml(content, {
								features: { gfm: true, frontmatter: false },
								hastPlugins: [expressiveCode({ themes: ['github-dark'] })],
							});

							return {
								slug,
								title: String(data.title || ''),
								date: String(data.date || ''),
								excerpt: String(data.excerpt || ''),
								tags: (data.tags as string[]) || [],
								html,
							};
						}),
				);

				posts.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				);

				return `export default ${JSON.stringify(posts)}`;
			}
		},
	};
}

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		tailwindcss(),
		blogPostsPlugin(),
		reactRouter(),
	],
});
