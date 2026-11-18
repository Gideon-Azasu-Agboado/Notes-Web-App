
import { Schema, model, models, Model } from "mongoose";

export interface IUser {
    username: string;
    email: string;
}

const UserSchema = new Schema<IUser>({
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
});

const User: Model<IUser> =
    models.User as Model<IUser> ||
    model<IUser>("User", UserSchema);

export default User;
