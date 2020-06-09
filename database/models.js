const mongoose = require('mongoose');

const totalSchema = mongoose.Schema({
  total: Number,
});

const userSchema = mongoose.Schema({
  username: String,
  total: Number,
});


const GlobalTotal = mongoose.model('GlobalTotal', totalSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  GlobalTotal,
  User,
}
