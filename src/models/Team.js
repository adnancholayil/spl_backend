const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  primaryColor: { type: String, default: '#f59e0b' },
  secondaryColor: { type: String, default: '#1e293b' },
  managerName: { type: String, required: true },
  startingBudget: { type: Number, default: 5000 },
  currentBalance: { type: Number, default: 5000 },
  totalSpent: { type: Number, default: 0 },
  playersBought: { type: Number, default: 0 },
  logoUrl: { type: String },
  managerPhotoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
