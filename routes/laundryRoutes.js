const express = require('express');
const router = express.Router();
const laundryController = require('../controllers/laundryController');
const auth = require('../middleware/auth');

router.get('/',laundryController.getAllLaundries);
router.post('/',laundryController.createLaundry);
router.get('/:id',laundryController.getLaundryById);
router.put('/:id',laundryController.updateLaundry);
router.delete('/:id',laundryController.deleteLaundry);

module.exports = router;
