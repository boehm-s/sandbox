import { Document } from "mongoose";

interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
}

interface IDisplayUser {
    email: IUser['email'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
}

interface ICreateUserInput {
    email: IUser['email'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    password: IUser['password'];
}

interface IUserModel extends IUser, Document {
    fullName(): string;
}

export {IUser, IDisplayUser, ICreateUserInput, IUserModel};
