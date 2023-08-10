import fs from "fs";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";
import { parse } from "zod-matter";
import { PostSchema } from "./types";

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
	const fileContents = await fs.readFileSync(
		`./src/content/${pageContext.routeParams.post}.md`,
		"utf8"
	);
	const { data, content } = parse(fileContents, PostSchema);
	const post = {
		id: data.id,
		slug: data.slug,
		title: data.title,
		image: data.image,
		content: content,
	};

	return {
		pageContext: {
			pageProps: {
				post: post,
			},
			// The page's <title>
			documentProps: { title: post.title },
		},
	};
}
