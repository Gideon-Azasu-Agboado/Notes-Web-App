import connectDb from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { username: string } }) {
    try {
        await connectDb()

        const username = params.username
        const user = await User.findOne({ username })
        return new NextResponse(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}