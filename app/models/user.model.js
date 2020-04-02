var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email } || {username: email})
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
              console.log(user)
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }

var User = mongoose.model('User', UserSchema);
module.exports = User;