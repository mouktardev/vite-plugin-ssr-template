import Button from "#/components/Button";
import { Link } from "#/components/Link";
import { Fade, WidthLeft, slideRight } from "#/renderer/animation";
import { isTransition } from "#/renderer/store";
import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { Book, ChevronLeft, Home } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";

type Props = {
	children: ReactNode;
};

export function LayoutDefault({ children }: Props) {
	const transition = useStore(isTransition);
	const [showSidebar, setShowSidebar] = useState(true);
	const toggleSidebar = useCallback(
		() => setShowSidebar((value) => !value),
		[]
	);
	return (
		<main>
			<div className="flex">
				<motion.aside
					variants={WidthLeft}
					initial="visible"
					animate={showSidebar ? "visible" : "hidden"}
					className="sticky h-screen top-0 z-40 overflow-hidden p-2 border bg-purple-300"
				>
					<nav className="flex flex-col gap-4">
						<Button
							className="w-10 h-10 ml-auto border px-2"
							onClick={toggleSidebar}
						>
							<motion.div
								initial={{ rotate: 0 }}
								animate={showSidebar ? { rotate: 0 } : { rotate: 180 }}
								transition={{ ease: "linear" }}
							>
								<ChevronLeft className="h-5 w-5 " />
							</motion.div>
						</Button>
						<Link
							href="/"
							className="flex items-center gap-4 p-2 hover:bg-purple-300/60 dark:hover:bg-purple-950/60 cursor-pointer rounded-md"
							activeProps="bg-purple-300 dark:bg-purple-950 font-semibold"
						>
							<Home className="w-5 h-5" />
							<motion.p
								variants={Fade}
								animate={showSidebar ? "visible" : "hidden"}
								className="tracking-wide text-sm"
							>
								Home
							</motion.p>
						</Link>
						<Link
							href="/posts"
							className="flex items-center gap-4 p-2 hover:bg-purple-300/60 dark:hover:bg-purple-950/60 cursor-pointer rounded-md"
							activeProps="bg-purple-300 dark:bg-purple-950 font-semibold"
						>
							<Book className="w-5 h-5" />
							<motion.p
								variants={Fade}
								animate={showSidebar ? "visible" : "hidden"}
								className="tracking-wide text-sm"
							>
								Posts
							</motion.p>
						</Link>
					</nav>
				</motion.aside>
				<motion.div
					variants={slideRight}
					animate={transition ? "exit" : "enter"}
					className="absolute z-30 inset-0 bg-black"
				></motion.div>
				{children}
			</div>
		</main>
	);
}
