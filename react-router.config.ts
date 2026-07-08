import type { Config } from '@react-router/dev/config';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const blogDir = join(rootDir, 'content', 'blog');
const blogSlugs = readdirSync(blogDir)
	.filter((file) => file.endsWith('.mdx'))
	.map((file) => file.replace(/\.mdx$/, ''));

export default {
	ssr: true,
	splitRouteModules: true,
	prerender: ['/', '/blog', ...blogSlugs.map((slug) => `/blog/${slug}`)],
} satisfies Config;
