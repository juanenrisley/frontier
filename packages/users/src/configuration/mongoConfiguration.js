const mongoose = require('mongoose');

export function mongoConfiguration() {
    mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
}