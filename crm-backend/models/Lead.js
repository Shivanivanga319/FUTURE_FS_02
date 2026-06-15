const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, default: 'Website Form' },
  status: { type: String, enum: ['New', 'Contacted', 'Converted'], default: 'New' },
  notes: { type: [String], default: [] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);