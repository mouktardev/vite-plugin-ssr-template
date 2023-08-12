import Button from "#/components/Button";
import { Link } from "#/components/Link";
import { Fade, WidthLeft } from "#/renderer/animation";
import { transition } from "#/renderer/store";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { Book, ChevronLeft, Home } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";

type Props = {
	children: ReactNode;
};

export function LayoutDefault({ children }: Props) {
	const isTransition = useStore(transition);
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
					className="sticky h-screen top-0 z-40 overflow-hidden p-2 border"
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
				<AnimatePresence>
					{isTransition && (
						<motion.div
							className="absolute z-40 w-full h-screen top-0 left-0 bg-white/20 bg-center bg-[length:100px_100px] bg-no-repeat bg-[url('./loading.svg')] origin-center "
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
						></motion.div>
						// <motion.div
						// 	className="absolute z-40 w-full h-screen top-0 left-0 bg-black origin-center"
						// 	initial={{ scaleX: 0 }}
						// 	animate={{ scaleX: 1 }}
						// 	exit={{ scaleX: 0 }}
						// 	transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
						// ></motion.div>
					)}
				</AnimatePresence>
				{children}
			</div>
		</main>
	);
}
