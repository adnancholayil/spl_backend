const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  playerName: { type: String, required: true },
  playerPosition: { type: String },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  teamName: { type: String, default: 'Unsold' },
  finalPrice: { type: Number, default: 0 },
  status: { type: String, enum: ['SOLD', 'UNSOLD'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auction', auctionSchema);
