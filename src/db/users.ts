import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({ //defines a Mongoose schema for a user in a database
    username: { type: String, required: true}, 
    email: { type: String, required: true},
    authentication: {
        password: { type: String, required: true, select: false}, //select false= avoid fetching authentication data
        salt: { type: String, select: false},
        sessionToken: { type: String, select: false},
    },
});


export const UserModel = mongoose.model('User', UserSchema); //exports a Mongoose model based on the UserSchema we defined earlier

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken   = (sessionToken: string)   => UserModel.findOne({ //confirm whether our user is logged in or not
    'authentication.sessionToken': sessionToken,
});
export  const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values)
 .save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
