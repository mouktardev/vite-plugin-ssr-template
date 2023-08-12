import { Variants } from "framer-motion";

export const easing = [0.175, 0.85, 0.42, 0.96];

export const containerVariants: Variants = {
	enter: {
		x: 0,
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.5,
			ease: easing,
		},
	},
	exit: { x: -100, opacity: 0, transition: { duration: 2 } },
};

export const slideRight: Variants = {
	enter: {
		x: [100, 0],
		// opacity: 1,
		transition: { duration: 0.5 },
	},
	exit: {
		x: [0, 100],
		// opacity: 0,
		transition: { duration: 0.5 },
	},
};
export const slideInTop: Variants = {
	enter: {
		y: 0,
		opacity: 1,
		// transition: { delay: 0.5 },
	},
	exit: {
		y: -20,
		opacity: 0,
	},
};

export const slideInLeft: Variants = {
	enter: {
		opacity: [0, 1],
		x: [300, 0],
		// transition: { ease: easing },
		transition: { ease: "easeIn" },
	},
	exit: {
		x: -100,
		opacity: 0,
		transition: { ease: easing },
	},
};

export const WidthLeft: Variants = {
	hidden: { width: "54px" },
	visible: {
		width: "160px",
		transition: {
			ease: "easeIn",
			delayChildren: 0.3,
		},
	},
};

export const Fade: Variants = {
	hidden: { opacity: 0, display: "none" },
	visible: {
		opacity: 1,
		display: "block",
		transition: {
			delay: 0.3,
		},
	},
};

export const pushButton: Variants = {
	unpressed: {
		scale: [null, 0.85, 1],
		opacity: 1,
	},
	pressed: {
		scale: 0.85,
		opacity: 0.7,
		transition: {
			type: "spring",
			duration: 0.3,
			bounce: 0.5,
		},
	},
};
