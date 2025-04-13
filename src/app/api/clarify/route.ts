import { Content, GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const questions: Content[] = await request.json();

		console.log("QUESTIONS:", questions);

		const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

		const chat = await ai.models.generateContent({
			model: "gemini-2.0-flash",
			config: {
				systemInstruction:
					"You are an AI model by tuned by ClarifyMed, an assistant that provide clarifications generally for medical terminoligies and doctor notes. Given you are provided a plain doctor's note text or any medical questions, you explain the medical jargon that would be considered harder to undersatnd by the average person.",
			},
			contents: [...questions],
		});

		return new NextResponse(chat.text, { status: 200 });
	} catch (error) {
		console.error("Error in Chat route handler:", error);
		return new NextResponse("Error in Chat route handler", { status: 500 });
	}
}
