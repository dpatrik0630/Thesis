// relatedPeopleController.js
const RelatedPerson = require('../models/relatedPerson');

const getAllRelatedPeople = async (req, res) => {
  try {
    const relatedPeople = await RelatedPerson.find();
    res.json(relatedPeople);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRelatedPersonById = async (req, res) => {
  const { id } = req.params;

  try {
    const relatedPerson = await RelatedPerson.findById(id);
    if (!relatedPerson) {
      return res.status(404).json({ message: 'Related person not found' });
    }
    res.json(relatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRelatedPerson = async (req, res) => {
  const { name } = req.body;

  try {
    const relatedPerson = new RelatedPerson({ name });
    await relatedPerson.save();
    res.status(201).json(relatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRelatedPerson = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedRelatedPerson = await RelatedPerson.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedRelatedPerson) {
      return res.status(404).json({ message: 'Related person not found' });
    }
    res.json(updatedRelatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRelatedPerson = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRelatedPerson = await RelatedPerson.findByIdAndDelete(id);
    if (!deletedRelatedPerson) {
      return res.status(404).json({ message: 'Related person not found' });
    }
    res.json({ message: 'Related person deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRelatedPeople,
  getRelatedPersonById,
  createRelatedPerson,
  updateRelatedPerson,
  deleteRelatedPerson,
};
