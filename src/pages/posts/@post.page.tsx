import CodeCopy from "#/components/CodeCopy";
import Image from "#/components/Image";
import TableOfContent from "#/components/TableOfContent";
import { cn, flatten } from "#/renderer/util";
import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Post } from "./types";

interface HeadingRendererProps {
	level: number;
	children: ReactNode;
}

const HeadingRenderer = (props: HeadingRendererProps) => {
	const children = React.Children.toArray(props.children);
	const text = children.reduce(flatten, "") as string;
	const slug = text.toLowerCase().replace(/[!?\s]/g, "-");
	return React.createElement(
		"h" + props.level,
		{ id: slug, className: "anchor" },
		props.children
	);
};

export function Page({ post }: { post: Post }) {
	return (
		<div className="container m-5 pt-10">
			<Image className="w-full h-52" src={post.image.src}></Image>
			<h1 className="scroll-m-20 my-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{post.title}
			</h1>
			<div className="relative flex gap-6">
				<div className="w-full p-5 mt-10 text-justify prose prose-sm md:prose-lg prose-pre:bg-[rgba(40,44,52,1)] border rounded-lg">
					<ReactMarkdown
						children={post.content}
						components={{
							h3: HeadingRenderer,
							h2: HeadingRenderer,
							pre({ children, className }) {
								return (
									<pre className={cn("relative", className)}>
										<CodeCopy>{children}</CodeCopy>
										{children}
									</pre>
								);
							},
							code({ inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter
										{...props}
										// customStyle={{ borderRadius: "8px" }}
										// className={cn("rounded-3xl", className)}
										children={String(children).replace(/\n$/, "")}
										style={oneDark}
										showLineNumbers={true}
										language={match[1]}
										PreTag="div"
									/>
								) : (
									<code {...props} className={className}>
										{children}
									</code>
								);
							},
						}}
					/>
				</div>
				<TableOfContent />
			</div>
		</div>
	);
}
