const Laundry = require('../models/laundry');
const moment = require('moment');

const getAllLaundries = async (req, res) => {
    try {
        const laundries = await Laundry.find().sort({date: -1});
        const laundriesWithRelatedPeople = laundries.map(laundry => ({
            ...laundry._doc,
            relatedPeople: laundry.relatedPeople || [],
        }));
        res.json(laundriesWithRelatedPeople);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLaundryById = async (req, res) => {
    const { id } = req.params;

    try {
        const laundry = await Laundry.findById(id);

        if (!laundry) {
            return res.status(404).json({ message: 'Laundry not found' });
        }

        res.json(laundry);
    } catch (error) {
        console.error('Error fetching laundry details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createLaundry = async (req, res) => {
    try {
        const { date, relatedPeople, weight, amount } = req.body;

        console.log('Received request to create laundry with data:', req.body);

        if (!date || !relatedPeople || !weight || !amount) {
            console.error('Missing required fields:', req.body);
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log('Parsed request body:', { date, relatedPeople, weight, amount });

        const laundry = new Laundry({ 
            date: new Date(date), 
            relatedPeople, 
            weight, 
            amount 
        });

        console.log('Created laundry instance:', laundry);

        await laundry.save();

        console.log('Laundry saved successfully:', laundry);

        res.json(laundry);
    } catch (error) {
        console.error('Error creating laundry:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateLaundry = async (req, res) => {
    const { id } = req.params;
    const { date, weight, amount } = req.body;

    try {
        const updatedLaundry = await Laundry.findByIdAndUpdate(id, { date, weight, amount }, { new: true });

        if (!updatedLaundry) {
            return res.status(404).json({ message: 'Laundry not found' });
        }

        res.json(updatedLaundry);
    } catch (error) {
        console.error('Error updating laundry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteLaundry = async (req, res) => {
    const { id } = req.params;

    try {

        const deletedLaundry = await Laundry.findByIdAndDelete(id);

        if (!deletedLaundry) {
            return res.status(404).json({ message: 'Laundry not found' });
        }

        res.json({ message: 'Laundry deleted successfully' });
    } catch (error) {

        console.error('Error deleting laundry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllLaundries, getLaundryById, createLaundry, updateLaundry, deleteLaundry };
