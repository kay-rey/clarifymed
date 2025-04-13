import { ObjectId } from "mongodb";
import {
	setupTestDb,
	clearTestDb,
	closeTestDb,
} from "../../db/__tests__/testDb";
import { Collections } from "../../db/schema";

describe("MedicalQuery Model", () => {
	let db: Collections;

	beforeAll(async () => {
		db = await setupTestDb();
	});

	afterEach(async () => {
		await clearTestDb();
	});

	afterAll(async () => {
		await closeTestDb();
	});

	test("should create a medical query", async () => {
		const query = {
			userId: new ObjectId(),
			originalText: "What does hypertension mean?",
			clarifiedText: "",
			status: "pending" as const,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const result = await db.medicalQueries.insertOne(query);
		expect(result.insertedId).toBeDefined();

		const savedQuery = await db.medicalQueries.findOne({
			_id: result.insertedId,
		});
		expect(savedQuery).toMatchObject(query);
	});

	test("should update query status and metadata", async () => {
		const query = {
			userId: new ObjectId(),
			originalText: "What is tachycardia?",
			clarifiedText: "",
			status: "pending" as const,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const { insertedId } = await db.medicalQueries.insertOne(query);

		const update = {
			status: "completed" as const,
			clarifiedText: "Tachycardia means your heart is beating too fast.",
			metadata: {
				processedAt: new Date(),
				model: "gemini-pro",
				confidence: 0.95,
			},
		};

		await db.medicalQueries.updateOne(
			{ _id: insertedId },
			{ $set: update }
		);

		const updatedQuery = await db.medicalQueries.findOne({
			_id: insertedId,
		});
		expect(updatedQuery).toMatchObject({
			...query,
			...update,
		});
	});
});
