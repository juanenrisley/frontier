import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    lastName: String
});

export const User = mongoose.model('User', UserSchema);