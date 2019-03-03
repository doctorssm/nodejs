const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  userId: Number,
  userName: String,
  password: {
    type: String,
    select: false,
    required: [true, 'Password is required!']
  },
  firstName: String,
  lastName: String,
  photo: String,
  group: Number,
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    trim: true
  },
  token: String,
  comment: String
});

// hash user password before saving into database
UserSchema.pre('save', function(next) {
  const user = this;

  // make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// confirm user password against the stored password
UserSchema.methods.comparePassword = function(password, done) {
  const user = this;

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      done(err);
    }

    done(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
