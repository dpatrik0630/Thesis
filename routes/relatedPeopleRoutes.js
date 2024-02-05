const express = require('express');
const router = express.Router();
const relatedPeopleController = require('../controllers/relatedPeopleController');
const auth = require('../middleware/auth');

router.use('/relatedpeople', auth);

router.get('/', relatedPeopleController.getAllRelatedPeople);
router.post('/', relatedPeopleController.createRelatedPerson);
router.get('/:id', relatedPeopleController.getRelatedPersonById);
router.put('/:id', relatedPeopleController.updateRelatedPerson);
router.delete('/:id', relatedPeopleController.deleteRelatedPerson);

module.exports = router;
