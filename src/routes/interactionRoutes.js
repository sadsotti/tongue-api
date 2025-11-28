const router = require('express').Router();
const controller = require('../controllers/interactionController');

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/filter', controller.filter);

module.exports = router;
