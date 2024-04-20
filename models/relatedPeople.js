const mongoose = require('mongoose');

const relatedPersonSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const RelatedPerson = mongoose.model('RelatedPerson', relatedPersonSchema);

module.exports = RelatedPerson;
