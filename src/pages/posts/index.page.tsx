import Image from "#/components/Image";
import { Link } from "#/components/Link";
import { motion } from "framer-motion";
import type { Post } from "./types";

export function Page({ posts }: { posts: Post[] }) {
	return (
		<div className="container m-5 pt-10">
			<h1 className="text-3xl my-10 font-extrabold tracking-tight">
				Welcome to your Posts Homepage
			</h1>
			<div className="flex gap-4">
				{posts.map((post) => (
					<Link
						key={post.id}
						href={`/posts/${post.slug}`}
						className="block py-2 hover:underline underline-offset-8 cursor-pointer"
						// activeProps={{ className: "font-semibold" }}
					>
						<div className="overflow-hidden border rounded-xl">
							<motion.div
								whileHover="hover"
								variants={{ hover: { scale: 1.2 } }}
							>
								<Image
									className="w-40 h-[200px]"
									src={post.image.src}
									alt={post.image.alt}
									aspectRatio="square"
								/>
							</motion.div>
						</div>
						<p className="text-2xl font-semibold">{post.title}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
