import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const ebookId = searchParams.get('ebookId');

    if (!userId || !ebookId) {
        return NextResponse.json(
            { error: 'Missing userId or ebookId' },
            { status: 400 }
        );
    }
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('FableEbook_DB');
        const purchaseCollection = db.collection('purchases');

        const purchase = await purchaseCollection.findOne({
            userId: new ObjectId(userId),
            ebookId: new ObjectId(ebookId),
        });

        return NextResponse.json({ purchased: !!purchase });
    } catch (error) {
        console.error('Error checking purchase:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}