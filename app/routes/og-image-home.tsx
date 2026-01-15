import { ImageResponse } from 'workers-og';
import OgImage, { getOgImageFonts } from '~/components/OgImage';

export async function loader() {
	const ogImgEl = (
		<OgImage
			title="Tommy Chung"
			subtitle="Full-Stack AI Developer & Data Scientist"
			description="Building scalable AI solutions with React, TypeScript & Cloud"
			url="tommy-chung.com"
		/>
	);

	return new ImageResponse(
		ogImgEl,
		{
			width: 1200,
			height: 630,
			fonts: await getOgImageFonts(),
		},
	);
}
