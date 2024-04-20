const RelatedPeople = require('../models/relatedPeople');
const mongoose = require('mongoose');


const getRelatedPersonById = async (req, res) => {
    const { personId } = req.params;

    try {
        const relatedPerson = await RelatedPeople.findById(personId);

        if (!relatedPerson) {
            return res.status(404).json({ message: 'Related person not found' });
        }

        res.json(relatedPerson);
    } catch (error) {
        console.error('Error getting related person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllRelatedPeople = async (req, res) => {
    try {
        const allRelatedPeople = await RelatedPeople.find();

        res.json(allRelatedPeople);
    } catch (error) {
        console.error('Error getting all related people:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createRelatedPerson = async (req, res) => {
    const { name } = req.body;

    try {
        const newRelatedPerson = new RelatedPeople({ name });

        await newRelatedPerson.save();

        res.json(newRelatedPerson);
    } catch (error) {
        console.error('Error creating related person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateRelatedPerson = async (req, res) => {
    const { personId } = req.params;
    const { name } = req.body;

    try {
        const updatedRelatedPerson = await RelatedPeople.findByIdAndUpdate(
            personId,
            { name },
            { new: true }
        );

        if (!updatedRelatedPerson) {
            return res.status(404).json({ message: 'Related person not found' });
        }

        res.json(updatedRelatedPerson);
    } catch (error) {
        console.error('Error updating related person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteRelatedPerson = async (req, res) => {
    try {
        const personId = req.params.personId;

        if (!personId || typeof personId !== 'string') {
            console.log("Invalid personId format:", personId);
            return res.status(400).json({ success: false, message: 'Invalid personId format' });
        }
        console.log(`Deleting person with ID: ${personId}`);

        const result = await RelatedPeople.findOneAndDelete({ name: personId });

        if (result) {
            console.log("Person deleted successfully");
            return res.status(200).json({ success: true, message: 'Person deleted successfully' });
        } else {
            console.log("Person not found");
            return res.status(404).json({ success: false, message: 'Person not found' });
        }

    } catch (error) {
        console.error("Error deleting related person:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    getRelatedPersonById,
    getAllRelatedPeople,
    createRelatedPerson,
    updateRelatedPerson,
    deleteRelatedPerson
};
