const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); //importing Authorization middleware 
const multer = require('../middleware/multer-config'); //importing the multer upload iddleware

const stuffCtrl = require('../controllers/stuff'); //importing stuff controller

router.get('/', auth, stuffCtrl.getAllStuff); //route to handle the '/' path including authorization
router.post('/', auth, multer, stuffCtrl.createThing); //route to handle a post request, creating a thing with upload middleware set
router.get('/:id', auth, stuffCtrl.getOneThing); //route to get only one thing with id
router.put('/:id', auth, stuffCtrl.modifyThing); //route to update one thing using the id
router.delete('/:id', auth, stuffCtrl.deleteThing); // route to delete thing using the id

module.exports = router;
