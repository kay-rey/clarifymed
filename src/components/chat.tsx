"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { medicalAiPromptSchema } from "@/lib/validation/schemas";
import axios from "axios";
import { useState } from "react";
import { Content } from "@google/genai";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import Loader from "./loader";
import { useUser } from '@auth0/nextjs-auth0';


const markdownTheme = {
	p: "mb-4 leading-relaxed",
	h1: "text-2xl font-bold mb-4 ",
	h2: "text-xl font-semibold mb-3",
	h3: "text-lg font-medium mb-2",
	ul: "list-disc pl-6 mb-4 space-y-2", // Changed from list-inside
	ol: "list-decimal pl-6 mb-4 space-y-2", // Changed from list-inside
	li: "pl-2",
	code: "rounded px-1 py-0.5 font-mono text-sm",
	pre: "rounded p-4 mb-4 overflow-x-auto",
};

export function Chat() {
	const { user } = useUser();
	const [messages, setMessages] = useState<Content[]>([]);
	const [isAiLoading, setAiLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof medicalAiPromptSchema>>({
		resolver: zodResolver(medicalAiPromptSchema),
		defaultValues: {
			question: "",
		},
	});

	async function onSubmit(values: z.infer<typeof medicalAiPromptSchema>) {
		// TODO: Error handling

		const userMessage: Content = {
			role: "user",
			parts: [{ text: values.question }],
		};

		let allMessages: Content[] = [...messages, userMessage];

		setMessages(allMessages);
		form.reset();
		setAiLoading(true);

		const response = await axios.post("/api/clarify", allMessages);

		await axios.post("/api/saved-responses", {
			userId: user?.sub,
			question: values.question,
			response: response.data
		  });

		const aiResponse: Content = {
			role: "model",
			parts: [{ text: response.data }],
		};

		allMessages = [...allMessages, aiResponse];

		setMessages(allMessages);

		setAiLoading(false);
	}

	return (
		<article className="space-y-10 px-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mx-auto max-w-lg space-y-4"
				>
					<FormField
						control={form.control}
						name="question"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ask a medical question for clarification</FormLabel>
								<FormControl>
									<Textarea placeholder="What is hypertension?" {...field} onKeyDown={(e) => {
										if(e.key === 'Enter' && !e.shiftKey){
											e.preventDefault();
											form.handleSubmit(onSubmit)();
										}
									}} />
								</FormControl>
								<FormDescription>
									<span className="font-bold">Disclaimer:</span> This app uses
									AI to provide simplified explanations of medical terms. The
									information provided is for general knowledge and
									informational purposes only, and does not constitute medical
									advice. It is essential 1 to consult with a qualified
									healthcare professional for any health concerns or before
									making any decisions related to your health or treatment. 2
									Reliance on the information provided by this app is solely at
									your own risk.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Ask</Button>
				</form>
			</Form>
			<section className="mx-auto flex max-w-lg flex-col gap-y-6">
				{messages.map((message, index) => (
					<div
						key={index}
						className={cn(
							"overflow-auto rounded-md",
							message.role === "user"
								? "self-end bg-gray-100 p-4 dark:bg-gray-900"
								: "flex flex-col self-start",
						)}
					>
						<Markdown
							components={{
								p: ({ node, ...props }) => <p className={markdownTheme.p} {...props} />,
								h1: ({ node, ...props }) => <h1 className={markdownTheme.h1} {...props} />,
								h2: ({ node, ...props }) => <h2 className={markdownTheme.h2} {...props} />,
								h3: ({ node, ...props }) => <h3 className={markdownTheme.h3} {...props} />,
								ul: ({ node, ...props }) => <ul className={markdownTheme.ul} {...props} />,
								ol: ({ node, ...props }) => <ol className={markdownTheme.ol} {...props} />,
								li: ({ node, ...props }) => <li className={markdownTheme.li} {...props} />,
								code: ({ node, inline, ...props }) => (
									<code className={inline ? markdownTheme.code : markdownTheme.pre} {...props} />
								),
							}}
						>{message.parts && message.parts[0].text}</Markdown>
					</div>
				))}
				{isAiLoading && <Loader />}
			</section>
		</article>
	);
}
