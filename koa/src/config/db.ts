import {connect, connection} from 'mongoose';

export function connectDB(uri: string) {
    connection
        .on('error', console.error)
        .on('close', _ => console.log('Database connection closed.'));

    return connect(uri);
};

