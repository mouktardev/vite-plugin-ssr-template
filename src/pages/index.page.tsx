import { Link } from "#/components/Link";
export function Page() {
	return (
		<div className="container m-5 pt-10">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold leading-tight tracking-tight">
					Mix of both worlds Astro and Nextjs
				</h1>
				<p className="max-w-lg leading-7 [&:not(:first-child)]:mt-6">
					Mix of both worlds Astro and Nextjs, file based routing, page
					transition mix SSR + SPA , Generate SSG Dynamic Markdown pages,
					tailwindCSS and more all powered by ⭐Vite-plugin-ssr⭐
				</p>
				<Link
					className="inline-block font-semibold border rounded-full px-4 py-2"
					href="/posts"
				>
					click to go to Posts
				</Link>
			</div>
		</div>
	);
}

// export async function onBeforeRender() {
// 	await sleep(1000); // Simulate slow network
// }
// function sleep(milliseconds: number): Promise<void> {
// 	return new Promise((r) => setTimeout(r, milliseconds));
// }
