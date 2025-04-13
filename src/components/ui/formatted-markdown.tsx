import React from "react";
import Markdown from "react-markdown";

// Define markdown theme styles
export const markdownTheme = {
	p: "mb-4 leading-relaxed",
	h1: "text-2xl font-bold mb-4 mt-6",
	h2: "text-xl font-bold mb-3 mt-5",
	h3: "text-lg font-bold mb-3 mt-4",
	ul: "list-disc pl-6 mb-4",
	ol: "list-decimal pl-6 mb-4",
	li: "mb-1",
	code: "px-1 py-0.5 bg-muted rounded text-sm font-mono",
	pre: "p-3 bg-muted rounded-md overflow-x-auto mb-4 font-mono text-sm",
};

type FormattedMarkdownProps = {
	content: string | undefined;
};

// A simpler reusable markdown component that just applies our styling
export default function FormattedMarkdown({ content }: FormattedMarkdownProps) {
	// Only render if we have content
	if (!content) return null;

	return (
		<Markdown
			components={{
				p: ({ node, ...props }) => (
					<p className={markdownTheme.p} {...props} />
				),
				h1: ({ node, ...props }) => (
					<h1 className={markdownTheme.h1} {...props} />
				),
				h2: ({ node, ...props }) => (
					<h2 className={markdownTheme.h2} {...props} />
				),
				h3: ({ node, ...props }) => (
					<h3 className={markdownTheme.h3} {...props} />
				),
				ul: ({ node, ...props }) => (
					<ul className={markdownTheme.ul} {...props} />
				),
				ol: ({ node, ...props }) => (
					<ol className={markdownTheme.ol} {...props} />
				),
				li: ({ node, ...props }) => (
					<li className={markdownTheme.li} {...props} />
				),
				code: ({ node, inline, ...props }) => (
					<code
						className={
							inline ? markdownTheme.code : markdownTheme.pre
						}
						{...props}
					/>
				),
			}}
		>
			{content}
		</Markdown>
	);
}
