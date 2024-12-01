const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
  topScore: {
    wpm: { type: Number},
    cpm: { type: Number},
    accuracy: { type: Number},
    error: { type: Number},
    score: { type: Number}
  },
    rank: {
        type:Number,
        unique: true
    },
});
module.exports = mongoose.model ('users', usersSchema);