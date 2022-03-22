const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const authMiddware = require('../middleware/authMiddware');

router.get('/user', authMiddware, controller.getUser);
router.get('/admin', controller.adminInfo);
router.post('/update', authMiddware, controller.update);
router.post('/login', controller.login);
router.post('/register', controller.registration);

module.exports = router;