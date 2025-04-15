const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount' },
  firstName: String,
  lastName: String,
  dob: String,
  address1: String,
  address2: String,
  city: String,
  postalCode: String,
  country: String,
  phone: String,
  email: String,
  notes: String
});

module.exports = mongoose.model('User', userSchema);
