const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);

//Protected Routes
router.post('/', auth, validate(['name']), categoryController.store);
router.put('/:id', auth, categoryController.update);
router.delete('/:id', auth, categoryController.destroy);

module.exports = router;
