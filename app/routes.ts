import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('/blog', 'routes/blog.tsx'),
	route('/blog/:slug', 'routes/blog.$slug.tsx'),

	// OG Image Generation Routes
	route('/og-image-home', 'routes/og-image-home.tsx'),
	route('/og-image-blog', 'routes/og-image-blog.tsx'),
	route('/og-image/:slug', 'routes/og-image.$slug.tsx'),
] satisfies RouteConfig;
