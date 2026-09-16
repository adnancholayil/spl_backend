const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  position: { type: String, required: true },
  basePrice: { type: Number, required: true },
  category: { type: String, default: 'Forward' },
  age: { type: Number },
  shortBio: { type: String },
  photoUrl: { type: String },
  status: { type: String, enum: ['UPCOMING', 'IN_AUCTION', 'SOLD', 'UNSOLD'], default: 'UPCOMING' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  soldPrice: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
