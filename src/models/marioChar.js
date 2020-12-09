const mongoose = require('mongoose');

//  Your code goes here
const marioSchema= new mongoose.Schema({
    name: String,
    weight: Number
})

marioModel= mongoose.model('mariochar',marioSchema);

module.exports = marioModel;