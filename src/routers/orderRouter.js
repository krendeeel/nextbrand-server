const Router = require('express')
const router = new Router()
const controller = require('../controllers/ordersController')
const authMiddware = require('../middleware/authMiddware')

router.get('/:id', authMiddware, controller.getOne)
router.get('/', authMiddware, controller.getHistory)
router.get('/delivered/:id', authMiddware, controller.delivered)
router.post('/', authMiddware, controller.createOrder)

module.exports = router;