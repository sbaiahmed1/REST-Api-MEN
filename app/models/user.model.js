var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    }
});

UserSchema.pre('save', function(){
    console.log(this);
});

var User = mongoose.model('User', UserSchema);
module.exports = User;