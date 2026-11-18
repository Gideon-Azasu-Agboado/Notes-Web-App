import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

const connectDb = async () => {
    const connectionState = mongoose.connection.readyState

    if (connectionState === 1) {
        console.log('Already connected')
        return
    }

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined')
    }

    try {
        if (connectionState === 2) {
            await mongoose.connection.asPromise()
        } else {
            await mongoose.connect(MONGODB_URI, {
                dbName: 'NotesWebApp',
                bufferCommands: true
            })
        }
        console.log('Connected to database')
    } catch (error) {
        console.error('Error connecting to database', error)
        throw error
    }

}

export default connectDb