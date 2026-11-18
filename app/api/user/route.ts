import connectDb from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: 'Email parameter is required' }, { status: 400 });
        }

        await connectDb()

        const user = await User.findOne({ email });
        console.log('user >>>>>>>>>>> ', user)

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

    } catch (error) {
        console.log('error >>>>>>>>>>> ', error)
        const message = error instanceof Error ? error.message : 'Unexpected error'
        return NextResponse.json({ message }, { status: 500 })
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
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unexpected error'
        return NextResponse.json({ message }, { status: 500 })
    }
}