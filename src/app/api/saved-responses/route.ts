import { getDb } from '@/lib/db/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { SavedResponse } from '@/lib/models/SavedResponse';
import { ObjectId } from 'mongodb';

// ...existing POST function...

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        
        if (!userId) {
            return NextResponse.json(
                { error: "UserId is required" },
                { status: 400 }
            );
        }

        const collections = await getDb();
        const responses = await collections.savedResponses
            .find<SavedResponse>({ userId: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(responses);
    } catch (error) {
        console.error("Failed to fetch saved responses:", error);
        return NextResponse.json(
            { error: "Failed to fetch saved responses" },
            { status: 500 }
        );
    }
}