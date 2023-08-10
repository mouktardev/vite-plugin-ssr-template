import { z } from "zod";

export const PostSchema = z.object({
	id: z.coerce.number(),
	slug: z.string().max(16),
	image: z.object({
		src: z.string(),
		alt: z.string().optional(),
	}),
	title: z.string(),
});

export type Post = {
	id: number,
	slug: string,
	image:{
		src: string,
		alt?: string,
	},
	title: string,
  content:string
};
