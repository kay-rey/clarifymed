/**
 * Medical Queries API Routes
 * Handles user medical text queries and their processing status.
 * Integrates with Gemini AI for text clarification.
 */

import { NextResponse, NextRequest } from "next/server";
import { getDb } from "@/lib/db/dbConnect";
import type { CreateMedicalQueryInput } from "@/lib/models/MedicalQuery";
import { ObjectId } from "mongodb";

/**
 * Creates a new medical query for processing
 * @param request Request containing query text and user ID
 * @returns Created query's ID or error response
 */
export async function POST(request: NextRequest) {
	try {
		const body: CreateMedicalQueryInput = await request.json();
		const collections = await getDb();

		const result = await collections.medicalQueries.insertOne({
			...body,
			status: "pending",
			metadata: {
				model: "gemini-2.0-flash",
				geminiConfig: {
					temperature: 0.7,
					topP: 0.8,
					topK: 40,
					maxOutputTokens: 2048,
				},
				processedAt: null,
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json({ id: result.insertedId }, { status: 201 });
	} catch (error) {
		console.error("Failed to create medical query:", error);
		return NextResponse.json(
			{ error: "Failed to create medical query" },
			{ status: 500 },
		);
	}
}

/**
 * Retrieves medical queries with optional filtering
 * @param request Request with optional userId or status parameters
 * @returns Matching queries or error response
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");
		const status = searchParams.get("status");
		const collections = await getDb();

		// Build query filters
		const query: any = {};
		if (userId) query.userId = userId;
		if (status) query.status = status;

		// Fetch queries with optional filters
		const queries = await collections.medicalQueries
			.find(query)
			.sort({ createdAt: -1 })
			.toArray();

		return NextResponse.json(queries);
	} catch (error) {
		console.error("Failed to fetch medical queries:", error);
		return NextResponse.json(
			{ error: "Failed to fetch medical queries" },
			{ status: 500 },
		);
	}
}
