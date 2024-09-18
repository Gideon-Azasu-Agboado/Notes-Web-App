import connectDb from "@/lib/dbConnect";
import Note from "@/models/notes";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const ObjectId = require('mongoose').Types.ObjectId;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email');
    const searchKeyword = searchParams.get('searchKeyword') as string

    if (searchKeyword) {
        try {
            const results = await Note.find({
                title: { $regex: searchKeyword, $options: 'i' },
            })
            return new NextResponse(JSON.stringify(results), { status: 200 })
        } catch (error: any) {
            return new NextResponse(error.message, { status: 500 })
        }
    }

    try {
        await connectDb();

        const notes = await Note.find({ email }).sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify(notes), { status: 200 })
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        await connectDb();

        const body = await request.json();
        const newNote = new Note(body);
        await newNote.save();

        return new NextResponse(
            JSON.stringify({ message: 'Note has been saved' }),
            { status: 200 }
        )
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const note_id = searchParams.get('note_id')
    const body = await request.json();

    try {
        await connectDb()

        if (!note_id) {
            return new NextResponse(
                JSON.stringify({ message: 'ID is not found' }),
                { status: 400 }
            )
        }

        if (!Types.ObjectId.isValid(note_id)) {
            return new NextResponse(
                JSON.stringify({ message: 'ID is not found' }),
                { status: 400 }
            )
        }

        const updateNote = await Note.findOneAndUpdate(
            { _id: new ObjectId(note_id) },
            body,
            { new: true }
        )

        if (!updateNote) {
            return new NextResponse(
                JSON.stringify({ message: 'Note does not exist' }),
                { status: 400 }
            )
        }

        return new NextResponse(
            JSON.stringify({ message: 'Note has been updated' }),
            { status: 200 }
        )
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const note_id = searchParams.get('note_id')
    console.log(note_id)

    try {
        await connectDb()

        if (!note_id) {
            return new NextResponse(
                JSON.stringify({ message: 'ID is not found' }),
                { status: 400 }
            )
        }

        if (!Types.ObjectId.isValid(note_id)) {
            return new NextResponse(
                JSON.stringify({ message: 'ID is not found' }),
                { status: 400 }
            )
        }

        const deleteNote = await Note.findByIdAndDelete(
            new Types.ObjectId(note_id)
        )

        if (!deleteNote) {
            return new NextResponse(
                JSON.stringify({ message: 'Note does not exist' }),
                { status: 400 }
            )
        }

        return new NextResponse(
            JSON.stringify({ message: 'Note has been deleted' }),
            { status: 200 }
        )
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 })
    }
}