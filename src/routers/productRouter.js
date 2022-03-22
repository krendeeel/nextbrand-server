const Router = require('express');
const router = new Router();
const controller = require('../controllers/produtsController');

router.get('/:id', controller.getOne);
router.get('/', controller.getAll);
router.get('/delete/:id', controller.removeProduct);
router.post('/add', controller.addProduct);
router.post('/update/:id', controller.updateProduct);

module.exports = router;