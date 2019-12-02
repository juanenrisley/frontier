import * as mongoose from "mongoose";


export const ProtoSchema = new mongoose.Schema({
    name: String,
    version: String,
    content: String
});