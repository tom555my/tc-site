export const getOgImageFonts = async () => {
	const { loadGoogleFont } = await import('workers-og');
	const googleSans400 = await loadGoogleFont({
		family: 'Google Sans Flex',
		weight: 400,
	});
	const googleSans600 = await loadGoogleFont({
		family: 'Google Sans Flex',
		weight: 600,
	});
	const geistMono400 = await loadGoogleFont({
		family: 'Geist Mono',
		weight: 400,
	});
	return [
		{
			name: 'Google Sans Flex',
			data: googleSans600,
			weight: 600,
		},
		{
			name: 'Google Sans Flex',
			data: googleSans400,
			weight: 400,
		},
		{
			name: 'Geist Mono',
			data: geistMono400,
			weight: 400,
		},
	];
};

export default function OgImage({
	title,
	subtitle,
	description,
	url,
}: {
	title: string;
	subtitle?: string;
	description?: string;
	url: string;
}) {
	return (
		<div
			style={{
				display: 'flex',
				height: '100%',
				width: '100%',
				backgroundColor: '#000000',
				fontFamily: 'Google Sans Flex',
			}}
		>
			{/* Left Column - Content */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: '100%',
					padding: '60px',
				}}
			>
				{/* Main Content */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<div
						style={{
							fontSize: 84,
							fontWeight: 800,
							color: '#d0d0d0',
							lineHeight: 0.95,
							letterSpacing: '-0.04em',
						}}
					>
						{title}
					</div>
					{subtitle && (
						<div
							style={{
								fontSize: 36,
								fontWeight: 600,
								color: '#a3a3a3',
								lineHeight: 1.2,
							}}
						>
							{subtitle}
						</div>
					)}
					<div
						style={{
							fontSize: 28,
							fontWeight: 500,
							color: '#a3a3a3',
							lineHeight: 1.4,
							maxWidth: '600px',
						}}
					>
						{description}
					</div>
				</div>

				{/* Footer */}
				<div
					style={{
						fontSize: 24,
						fontWeight: 600,
						color: '#a3a3a3',
						fontFamily: 'Geist Mono',
					}}
				>
					{url}
				</div>
			</div>

			{/* Right Column - Gradient */}
			<div
				style={{
					width: '50%',
					height: '100%',
					position: 'absolute',
					right: 0,
					top: 0,
					backgroundImage:
						'radial-gradient(circle at center, #e36414 0%, transparent 70%)',
					opacity: 0.3,
				}}
			/>
		</div>
	);
}
