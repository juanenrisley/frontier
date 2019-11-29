export function mongoConfiguration() {

    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/frontier', {useNewUrlParser: true});
}