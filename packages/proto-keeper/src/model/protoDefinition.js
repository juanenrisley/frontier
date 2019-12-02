import * as mongoose from "mongoose";

const ProtoSchema = new mongoose.Schema({
    name: String,
    version: String,
    content: String
});

export const Proto = mongoose.model('Proto', ProtoSchema);