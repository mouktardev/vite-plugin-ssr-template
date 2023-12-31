import fs from "fs";
import { parse } from "zod-matter";
import { PostSchema, type Post } from "./types";

export async function onBeforeRender() {
	// await sleep(1000); // Simulate slow network
	const posts = getPosts();
	return {
		pageContext: {
			pageProps: {
				posts: posts,
			},
			// The page's title & description
			documentProps: {
				title: "All Posts",
				description: `This page has ${posts.length} posts to browse`,
			},
		},
	};
}

function getPosts(): Post[] {
	const folder = "./src/content/";
	const files = fs.readdirSync(folder);
	const markdownPosts = files.filter((file) => file.endsWith(".md"));

	// Get zod-matter data from each file.
	const posts = markdownPosts.map((fileName) => {
		const fileContents = fs.readFileSync(`./src/content/${fileName}`, "utf8");
		const { data, content } = parse(fileContents, PostSchema);
		return {
			id: data.id,
			slug: data.slug,
			title: data.title,
			image: data.image,
			content: content,
		};
	});

	return posts;
}

export async function prerender() {
	const posts = getPosts();

	return [
		{
			url: "/posts",
			// We already provide `pageContext` here so that `vite-plugin-ssr`
			// will *not* have to call the `onBeforeRender()` hook defined
			// above in this file.
			pageContext: {
				pageProps: {
					posts: posts,
				},
				documentProps: {
					title: "All Posts",
					description: `This page has ${posts.length} posts to browse`,
				},
			},
		},
		...posts.map((post) => {
			const url = `/posts/${post.slug}`;
			return {
				url,
				// Note that we can also provide the `pageContext` of other pages.
				// This means that `vite-plugin-ssr` will not call any
				// `onBeforeRender()` hook and the Star Wars API will be called
				// only once (in this `prerender()` hook).
				pageContext: {
					pageProps: {
						post: post,
					},
					documentProps: {
						title: post.title,
						description: `This page ia about ${post.title}`,
					},
				},
			};
		}),
	];
}

// function getTitle(posts: Post[]): string {
// 	const title = `${posts.length} Posts`;
// 	return title;
// }

// function sleep(milliseconds: number): Promise<void> {
// 	return new Promise((r) => setTimeout(r, milliseconds));
// }
