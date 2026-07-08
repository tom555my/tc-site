import OgImage, { getOgImageFonts } from '~/components/OgImage';
import { getPostBySlug } from '../lib/blog.server';

interface LoaderArgs {
	params: {
		slug: string;
	};
}

export async function loader({ params }: LoaderArgs) {
	const { ImageResponse } = await import('takumi-js/response');
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw new Response('Not Found', { status: 404 });
	}

	// Limit excerpt to 120 characters for better display
	const truncatedExcerpt =
		post.excerpt.length > 120
			? post.excerpt.substring(0, 120) + '...'
			: post.excerpt;

	// Show up to 4 tags
	const displayTags = post.tags.slice(0, 4);

	const ogImgEl = (
		<OgImage
			title={post.title}
			description={truncatedExcerpt}
			url={
				displayTags.length > 0
					? displayTags.map((tag) => `#${tag}`).join(' ')
					: ''
			}
		/>
	);

	return new ImageResponse(ogImgEl, {
		width: 1200,
		height: 630,
		fonts: await getOgImageFonts(),
	});
}
