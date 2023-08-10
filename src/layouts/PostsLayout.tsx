import Button from "#/components/Button";
import { Link } from "#/components/Link";
import { Fade, WidthLeft } from "#/renderer/animation";
import { motion } from "framer-motion";
import { ChevronLeft, LayoutGrid } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";

type Props = {
	children: ReactNode;
};

export function PostsLayout({ children }: Props) {
	const [showSidebar, setShowSidebar] = useState(true);
	const toggleSidebar = useCallback(
		() => setShowSidebar((value) => !value),
		[]
	);
	return (
		<div className="relative flex flex-1 gap-5">
			<motion.aside
				variants={WidthLeft}
				initial="visible"
				animate={showSidebar ? "visible" : "hidden"}
				className="sticky top-0 h-screen z-40 overflow-hidden px-2 pt-[115px] border-r shadow-custom backdrop-blur-lg bg-gradient-radial-tl"
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
						href="/posts"
						className="flex items-center gap-4 p-2 hover:bg-purple-300/60 dark:hover:bg-purple-950/60 cursor-pointer rounded-md"
						activeProps="bg-purple-300 dark:bg-purple-950 font-semibold"
					>
						<LayoutGrid className="w-5 h-5" />
						<motion.p
							variants={Fade}
							animate={showSidebar ? "visible" : "hidden"}
							className="tracking-wide text-sm"
						>
							All
						</motion.p>
					</Link>
					{/* {posts.map((post) => (
						<Link
							key={post.id}
							href={`/posts/${post.slug}`}
							className="flex items-center gap-4 p-2 hover:bg-purple-300/60 dark:hover:bg-purple-950/60 cursor-pointer rounded-md"
							activeProps="bg-purple-300 dark:bg-purple-950 font-semibold"
						>
							<Newspaper className="h-5 w-5" />
							<motion.p
								variants={Fade}
								animate={showSidebar ? "visible" : "hidden"}
								className="tracking-wide text-sm"
							>
								{post.title}
							</motion.p>
						</Link>
					))} */}
				</nav>
			</motion.aside>
			{children}
		</div>
	);
}
