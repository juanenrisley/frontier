import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  lastName: String
});

export default mongoose.model('User', UserSchema);
