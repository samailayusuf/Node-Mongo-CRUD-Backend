const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//defining user schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//plugging unique validator to user schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
