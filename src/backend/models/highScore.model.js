/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const highScore = new Schema({
  difficulty: { type: String, trim: true, required: 'Difficulty cannot be blank' },
  alias: { type: String, trim: true, required: 'Alias cannot be blank' },
  score: { type: Number, required: 'Score cannot be blank' },
  date: { type: Date, default: Date.now },


}, { collection: 'highscores' });

const Score = mongoose.model('highScore', highScore);

module.exports = Score;