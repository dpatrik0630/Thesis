const { Double } = require('mongodb');
const mongoose = require('mongoose');

const laundrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  relatedPeople: String,
  weight: Number,
  amount: Number
});

const Laundry = mongoose.model('Laundry', laundrySchema);

module.exports = Laundry;
