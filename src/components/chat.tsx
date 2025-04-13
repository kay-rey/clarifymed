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
import { useState } from "react";
import { Content } from "@google/genai";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import Loader from "./loader";
import DisclaimerDialog from "./disclaimer-dialog";
import { AlertDialogTrigger } from "./ui/alert-dialog";

export function Chat() {
	const [messages, setMessages] = useState<Content[]>([]);
	const [isAiLoading, setAiLoading] = useState<boolean>(false);

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

	return (
		<article className="space-y-10 px-10">
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
									Ask a medical question for clarification
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
							<AlertDialogTrigger asChild disabled={isSubmitting}>
								<Button
									type="submit"
									className="cursor-pointer"
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
						<Markdown>
							{message.parts && message.parts[0].text}
						</Markdown>
					</div>
				))}
				{isAiLoading && <Loader />}
			</section>
		</article>
	);
}
