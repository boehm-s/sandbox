import {ICreateUserInput, IDisplayUser} from './users.interface';
import {User} from './users.model';

const getAllUsers = async function():Promise<IDisplayUser[]> {
    const users = await User.find({});
    const usersToDisplay = users.map(u => ({
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName
    }));

    return usersToDisplay;
};

const createUser = async function (body:ICreateUserInput):Promise<IDisplayUser> {
    const _user = new User(body);
    const user = await _user.save();
    const userToDisplay = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    return userToDisplay;
}

export {getAllUsers, createUser};
