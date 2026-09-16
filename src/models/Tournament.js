const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, default: 'Football' },
  season: { type: String, default: '2026 Season' },
  location: { type: String },
  numberOfTeams: { type: Number, default: 5 },
  currency: { type: String, default: '₹' },
  defaultBudget: { type: Number, default: 5000 },
  minIncrement: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Tournament', tournamentSchema);
