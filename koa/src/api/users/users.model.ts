import { Document, Schema, Model, model} from "mongoose";
import { IUser, IUserModel } from "../../core/Users/User";

const UserSchema: Schema = new Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

UserSchema.pre('save', (function(next: any) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
}).bind(this)); // dirty

UserSchema.methods.fullName = function(): string {
    return `${this.firstName.trim()} ${this.lastName.trim()}`;
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
