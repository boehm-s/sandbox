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

export {IUser, IDisplayUser, ICreateUserInput};
