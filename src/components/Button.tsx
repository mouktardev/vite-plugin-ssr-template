import { pushButton } from "#/renderer/animation";
import { cn } from "#/renderer/util";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

type Props = {
	// onClick: React.MouseEventHandler<HTMLButtonElement>
	children: ReactNode;
	onClick?: () => void;
	onStart?: () => void;
	className?: string;
	id?: string;
	disabled?: boolean;
};
export default function Button({
	children,
	onClick,
	onStart,
	className,
	id,
	disabled,
}: Props) {
	const [pressing, setPressing] = useState(false);
	return (
		<motion.button
			type="button"
			onClick={onClick}
			onTapStart={() => {
				setPressing(true);
				onStart;
			}}
			onTap={() => {
				setPressing(false);
			}}
			onTapCancel={() => {
				setPressing(false);
			}}
			animate={pressing ? "pressed" : "unpressed"}
			initial={false}
			variants={pushButton}
			transition={{ type: "spring", duration: 0.3, bounce: 0.5 }}
			className={cn(
				"rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
				className
			)}
			disabled={disabled}
			id={id}
		>
			{children}
		</motion.button>
	);
}
