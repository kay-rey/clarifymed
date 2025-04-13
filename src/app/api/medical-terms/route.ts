import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/dbConnect";
import type { CreateMedicalTermInput } from "@/lib/models/MedicalTerm";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
	try {
		const body: CreateMedicalTermInput = await request.json();
		const collections = await getDb();

		const result = await collections.medicalTerms.insertOne({
			...body,
			_id: new ObjectId(),
			usage: {
				searchCount: 0,
				lastAccessed: new Date(),
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json({ id: result.insertedId }, { status: 201 });
	} catch (error) {
		console.error("Failed to create medical term:", error);
		return NextResponse.json(
			{ error: "Failed to create medical term" },
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		console.log("request:", request);
		const { searchParams } = new URL(request.url);
		const term = searchParams.get("term");
		const category = searchParams.get("category");
		const collections = await getDb();

		// Search by term
		if (term) {
			// First, check cache
			const result = await collections.medicalTerms.findOne({
				$text: { $search: term },
			});

			if (result) {
				// Update usage statistics
				await collections.medicalTerms.updateOne(
					{ _id: result._id },
					{
						$inc: { "usage.searchCount": 1 },
						$set: { "usage.lastAccessed": new Date() },
					},
				);
				return NextResponse.json(result);
			}

			// TODO: AI Team - If term not found in cache, use AI to generate definition
			// const aiDefinition = await generateMedicalDefinition(term)
			// const newTerm = {
			//     term,
			//     definition: aiDefinition.simple,
			//     technicalDefinition: aiDefinition.technical,
			//     category: aiDefinition.categories,
			//     metadata: {
			//         complexity: aiDefinition.complexity,
			//         verified: true
			//     }w
			// }
			// await collections.medicalTerms.insertOne(newTerm)
			// return NextResponse.json(newTerm)

			return NextResponse.json({ error: "Term not found" });
		}

		// ...existing code for category filtering and popular terms...

		// Filter by category
		if (category) {
			const terms = await collections.medicalTerms
				.find({ category: category })
				.toArray();
			return NextResponse.json(terms);
		}

		// Return most frequently accessed terms
		const terms = await collections.medicalTerms
			.find()
			.sort({ "usage.searchCount": -1 })
			.limit(100)
			.toArray();

		return NextResponse.json(terms);
	} catch (error) {
		console.error("Failed to fetch medical terms:", error);
		return NextResponse.json(
			{ error: "Failed to fetch medical terms" },
			{ status: 500 },
		);
	}
}
