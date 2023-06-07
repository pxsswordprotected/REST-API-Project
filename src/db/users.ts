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

export const getUserBySessionToken = (sessionToken: string)   => UserModel.findOne({ //confirm whether our user is logged in or not
    'authentication.sessionToken': sessionToken,
});
export  const getUserById = (id: string) => UserModel.findById(id); //retrieves a user from the database based on their ID

export const createUser = (values: Record<string, any>) => new UserModel(values) //create a new user in the database
 .save().then((user) => user.toObject());
 
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id}); //delete a user from the database based on their ID. It searches for a user with the matching ID and removes the corresponding document from the collection.
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values); //update a user in the database based on their ID. It searches for a user with the matching ID, modifies the user document with the provided values, and saves the updated document to the database.

