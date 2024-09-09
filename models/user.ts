import { Schema, model, models, Document } from "mongoose";

interface IUser extends Document {
    username: string,
    email: string
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    }
)

const User = models.User || model('User', UserSchema)

export default User