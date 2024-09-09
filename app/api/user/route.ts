import connectDb from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');

        if (!email) {
            return new NextResponse(JSON.stringify('Email parameter is required'), { status: 500 });
        }

        await connectDb()

        const user = await User.findOne({ email });
        if (user) {
            console.log('success')
            return new NextResponse(
                JSON.stringify({ message: 'success', user }),
                { status: 200 }
            )
        } else {
            console.log('create-user')
            return new NextResponse(
                JSON.stringify({ message: 'create' }),
                { status: 200 }
            )
        }

    } catch (error: any) {
        console.log('error >>>>>>>>>>> ', error)
        return new NextResponse(error.message, { status: 500 })
    }
}


export async function POST(request: Request) {
    try {
        await connectDb()

        const data = await request.json()
        const newUser = new User(data)
        await newUser.save()

        return new NextResponse(
            JSON.stringify({ message: 'User created succesfully', user: newUser }),
            { status: 200 }
        )
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 })
    }
}