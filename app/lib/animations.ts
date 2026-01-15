// Spring configurations for natural motion
export const springs = {
	gentle: { type: 'spring' as const, stiffness: 100, damping: 15, mass: 0.5 },
	bouncy: { type: 'spring' as const, stiffness: 300, damping: 20, mass: 0.8 },
	snappy: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.5 },
} as const;

// Entrance animations
export const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: springs.gentle,
	},
};

export const fadeInScale = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: springs.gentle,
	},
};

export const slideInLeft = {
	hidden: { opacity: 0, x: -30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: springs.gentle,
	},
};

export const slideInRight = {
	hidden: { opacity: 0, x: 30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: springs.gentle,
	},
};

// Stagger container for sequential animations
export const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
};

// Hover animations
export const hoverLift = {
	rest: { y: 0, scale: 1 },
	hover: {
		y: -4,
		scale: 1.02,
		transition: springs.snappy,
	},
};

export const hoverGlow = {
	rest: { filter: 'brightness(1)' },
	hover: {
		filter: 'brightness(1.1)',
		transition: { duration: 0.3 },
	},
};

// Micro-interactions
export const tapScale = {
	scale: 0.98,
	transition: springs.snappy,
};

// Respect reduced motion preferences
export const shouldReduceMotion =
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getTransition = (config: any) =>
	shouldReduceMotion ? { duration: 0.01 } : config;
