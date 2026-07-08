/// <reference types="vite/client" />

declare module 'virtual:blog-posts' {
	interface BlogPost {
		slug: string;
		title: string;
		date: string;
		excerpt: string;
		tags: string[];
		html: string;
	}

	const posts: BlogPost[];
	export default posts;
}
