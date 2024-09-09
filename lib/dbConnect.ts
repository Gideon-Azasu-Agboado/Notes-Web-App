import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

const connectDb = async () => {
    const connectionState = mongoose.connection.readyState

    if (connectionState === 1) {
        console.log('Already connected')
        return
    }

    if (connectionState === 2) {
        console.log('Connecting to database')
        return
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: 'NotesWebApp',
            bufferCommands: true
        })
        console.log('Connected to database')
    } catch (error: any) {
        console.log('Error', error)
        throw new Error('Error connecting to database', error)
    }

}

export default connectDb