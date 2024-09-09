import mongoose, { Document } from "mongoose";

interface INote extends Document {
    title: string,
    description: string,
}

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Note = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema)

export default Note