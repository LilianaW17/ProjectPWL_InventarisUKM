const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/', itemController.index);
router.get('/:id', itemController.show);

// Protected Routes
router.post('/', auth, validate(['category_id', 'name', 'stock', 'price']), itemController.store);
router.put('/:id', auth, itemController.update);
router.delete('/:id', auth, itemController.destroy);

module.exports = router;
