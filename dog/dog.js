//  Dog.js
var mongoose = require('mongoose');  
var DogSchema = new mongoose.Schema({  
  alias: String,
  type: String,
  breed: String,
  size: String,
  sex: String,
  lifeStyle: String,
  intrests: String,
});
mongoose.model('Dog', DogSchema);

module.exports = mongoose.model('Dog');