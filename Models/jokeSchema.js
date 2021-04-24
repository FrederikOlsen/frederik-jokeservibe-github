//jokeSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const jokeSchema = new mongoose.Schema({
    setUp: String,
    punchLine: String,
}); 

module.exports = mongoose.model('jokes', jokeSchema);