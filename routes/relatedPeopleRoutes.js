const express = require('express');
const router = express.Router();
const relatedPeopleController = require('../controllers/relatedPeopleController');
const auth = require('../middleware/auth');
router.use('/relatedpeople', auth);

router.get('/', relatedPeopleController.getAllRelatedPeople);
router.post('/', relatedPeopleController.createRelatedPerson);
router.get('/:personId', relatedPeopleController.getRelatedPersonById);
router.put('/:personId', relatedPeopleController.updateRelatedPerson);
router.delete('/:personId', relatedPeopleController.deleteRelatedPerson);

module.exports = router;
