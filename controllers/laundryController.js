const Laundry = require('../models/laundry');


//GET ALL
const getAllLaundries = async (req, res) => {
  try {
      let laundries;
      if (!req.user) {
        return res.status(401).json({ message: 'Access denied. No user information.' });
      }

      if (req.user.role === 'admin') {
          laundries = await Laundry.find();
      } else {
          laundries = await Laundry.find({ relatedPeople: req.user.username });
      }

      res.json(laundries);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

//GET BY ID
const getLaundryById = async (req, res) => {
  const { id } = req.params;

  try {
      const laundry = await Laundry.findById(id);
      if (!laundry) {
          return res.status(404).json({ message: 'Laundry not found' });
      }

      if (req.user.role === 'admin' || laundry.relatedPeople.includes(req.user.username)) {
          res.json(laundry);
      } else {
          return res.status(403).json({ message: 'Permission denied. Admin access or access to own laundry required.' });
      }
  } catch (error) {
      console.error('Error fetching laundry details:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


//POST
const createLaundry = async (req, res) => {
  const { date, relatedPeople, weight, amount } = req.body;

  try {

    if(req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied. Admin access required. '});
    } else {
      relatedPeople.push(req.user.username);
    }

    const laundry = new Laundry({ date, relatedPeople, weight, amount });
    await laundry.save();
    res.status(201).json(laundry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//PUT
const updateLaundry = async (req, res) => {
    const { id } = req.params;
    const { date, relatedPeople, weight, amount } = req.body;
  
    try {

      if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied. Admin access required. '});
      }

      const updatedLaundry = await Laundry.findByIdAndUpdate(id, { date, relatedPeople, weight, amount }, { new: true });

      if (!updateLaundry) {
        return res.status(404).json({ message: 'Laundry not found'});
      }

      res.json(updatedLaundry);
    } catch (error) {
      console.error('Error updating laundry:', error);
      res.status(500).json({ message: 'Internal server error'});
    }
};

//DELETE
const deleteLaundry = async (req, res) => {
    const { id } = req.params;
  
    try {

      if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied. Admin access required. '});
      }

      const deletedLaundry = await Laundry.findByIdAndDelete(id);

      if (!deletedLaundry) {
        return res.status(404).json({ message: 'Laundry not found'});
      }

      res.json({ message: 'Laundry deleted successfully' });
    } catch (error) {
      console.error('Error deleting laundry:', error)
      res.status(500).json({ message: 'Internal server error'});
    }
};

module.exports = {
    getAllLaundries,
    getLaundryById,
    createLaundry,
    updateLaundry,
    deleteLaundry
};
