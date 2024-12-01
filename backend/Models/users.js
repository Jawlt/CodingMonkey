const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type:String,
        required:true
    },
  topScore: {
    wpm: { type: Number},
    timing: { type: Number},
    accuracy: { type: Number},
    error: { type: Number},
    score: { type: Number}
  },
});
module.exports = mongoose.model ('users', usersSchema);