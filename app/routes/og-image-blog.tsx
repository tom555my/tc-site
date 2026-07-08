import OgImage, { getOgImageFonts } from '~/components/OgImage';

export async function loader() {
	const { ImageResponse } = await import('takumi-js/response');
	const ogImgEl = (
		<OgImage
			title="Blog"
			subtitle="Full-Stack Development, AI & Web Technology"
			description="Expert insights on React, TypeScript, and modern web architecture"
			url="tommy-chung.com/blog"
		/>
	);

	return new ImageResponse(ogImgEl, {
		width: 1200,
		height: 630,
		fonts: await getOgImageFonts(),
	});
}
