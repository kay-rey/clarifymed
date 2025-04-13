"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { medicalAiPromptSchema } from "@/lib/validation/schemas";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Content } from "@google/genai";
import FormattedMarkdown from "./ui/formatted-markdown";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import Loader from "./loader";
import { useUser } from "@auth0/nextjs-auth0";
import DisclaimerDialog from "./disclaimer-dialog";
import { AlertDialogTrigger } from "./ui/alert-dialog";
import { FilePlus } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

// Markdown styles moved to markdown-renderer component

export function Chat() {
	const { user } = useUser();
	const [messages, setMessages] = useState<Content[]>([]);
	const [isAiLoading, setAiLoading] = useState<boolean>(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const form = useForm<z.infer<typeof medicalAiPromptSchema>>({
		resolver: zodResolver(medicalAiPromptSchema),
		defaultValues: {
			question: "",
		},
	});

	const { submitCount, isSubmitting } = form.formState;

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

		const aiResponse: Content = {
			role: "model",
			parts: [{ text: response.data }],
		};

		allMessages = [...allMessages, aiResponse];

		setMessages(allMessages);

		setAiLoading(false);
	}

	// whenever a new response comes in, it is scrolled into view
	useEffect(
		() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
		[messages],
	);

	return (
		<article className="space-y-10 p-2 sm:p-6 md:px-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mx-auto max-w-xl space-y-4"
				>
					<FormField
						control={form.control}
						name="question"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Input your medical statement or general
									medical clarifications
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="What is hypertension?"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DisclaimerDialog>
						{submitCount === 0 ? (
							<AlertDialogTrigger asChild>
								<Button
									type="submit"
									className="cursor-pointer"
									disabled={isSubmitting}
								>
									Ask
								</Button>
							</AlertDialogTrigger>
						) : (
							<Button
								type="submit"
								disabled={isSubmitting}
								className="cursor-pointer"
							>
								Ask
							</Button>
						)}
					</DisclaimerDialog>
				</form>
			</Form>
			<section className="mx-auto flex max-w-xl flex-col gap-y-6">
				<Toaster />
				{messages.map((message, index) => (
					<div
						key={index}
						className={cn(
							"overflow-auto rounded-md",
							message.role === "user"
								? "self-end bg-gray-100 p-4 dark:bg-gray-900"
								: "self-start",
						)}
					>
						<FormattedMarkdown
							content={message.parts ? message.parts[0].text : ""}
						/>

						{message.role === "model" && (
							<Button
								variant={"secondary"}
								onClick={async () => {
									await axios.post("/api/saved-responses", {
										userId: user?.sub,
										question:
											messages[index - 1].parts![0].text,
										response: message.parts![0].text,
									});

									toast.success(
										"Note has been saved. View in Saved Notes.",
									);
								}}
							>
								<FilePlus />
								Save as Note
							</Button>
						)}
					</div>
				))}
				{isAiLoading && <Loader />}
				<div ref={messagesEndRef} />
			</section>
		</article>
	);
}
