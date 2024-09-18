import mongoose, { model, models, Schema } from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        updateState: {
            type: Boolean,
            required: true
        },
    },
    { timestamps: true }
)

const Note = models.Note || model('Note', NoteSchema)

export default Note