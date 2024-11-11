// const crypto = require('crypto');
// const bcrypt = require('@node-rs/bcrypt');
// const mongoose = require('mongoose');

import crypto from 'crypto'; 
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: { type: String},
  image: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,

  google: String,
  github: String,
  tokens: Array,
  
  score: {
    type: Number, 
    default: 0
  },

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  } 

}, { timestamps: true });


userSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});


userSchema.methods.comparePassword = async function comparePassword(candidatePassword, cb) {
  try {
    cb(null, await bcrypt.compare(candidatePassword, this.password));
  } catch (err) {
    cb(err);
  }
};


userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/00000000000000000000000000000000?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

export default User;