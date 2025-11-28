const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.create);
router.put('/:id', postController.update);
router.delete('/:id', postController.remove);

router.get('/', postController.all);              
router.get('/filter', postController.filter);       
router.get('/aggregated', postController.aggregated); 

module.exports = router;
