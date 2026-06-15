import { reactRouter } from '@react-router/dev/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import rehypePrettyCode from 'rehype-pretty-code';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// Custom Vite plugin to provide blog posts as a virtual module
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
		load(id: string) {
			if (id === resolvedVirtualModuleId) {
				// Read blog posts at build time using Node.js fs
				const blogDir = path.join(__dirname, 'content', 'blog');
				const files = fs.readdirSync(blogDir);

				const posts = files
					.filter((file) => file.endsWith('.mdx'))
					.map((file) => {
						const slug = file.replace('.mdx', '');
						const filePath = path.join(blogDir, file);
						const fileContent = fs.readFileSync(filePath, 'utf-8');
						const { data, content } = matter(fileContent);

						return {
							slug,
							title: String(data.title || ''),
							date: String(data.date || ''),
							excerpt: String(data.excerpt || ''),
							tags: (data.tags as string[]) || [],
							content,
						};
					})
					.sort(
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
		mdx({
			rehypePlugins: [
				[
					rehypePrettyCode,
					{
						theme: 'one-dark-pro',
						onVisitLine(node: any) {
							if (node.children.length === 0) {
								node.children = [{ type: 'text', value: ' ' }];
							}
						},
						onVisitHighlightedLine(node: any) {
							if (node.properties.className) {
								node.properties.className.push('highlighted');
							}
						},
					},
				],
			],
		}),
		reactRouter(),
	],
});
