import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/dbConnect";
import { SavedResponse } from "@/lib/models/SavedResponse";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const collections = await getDb();

		const result = await collections.savedResponses.insertOne({
			...body,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json({ id: result.insertedId }, { status: 201 });
	} catch (error) {
		console.error("Failed to save response:", error);
		return NextResponse.json(
			{ error: "Failed to save response" },
			{ status: 500 },
		);
	}
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "UserId is required" },
				{ status: 400 },
			);
		}

		const collections = await getDb();
		const responses = await collections.savedResponses
			.find({ userId })
			.sort({ createdAt: -1 })
			.toArray();

		return NextResponse.json(responses);
	} catch (error) {
		console.error("Failed to fetch saved responses:", error);
		return NextResponse.json(
			{ error: "Failed to fetch saved responses" },
			{ status: 500 },
		);
	}
}
