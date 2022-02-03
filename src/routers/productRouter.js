const Router = require('express')
const router = new Router()
const controller = require('../controllers/produtsController')

router.get('/:id', controller.getOne)
router.get('/', controller.getAll)

module.exports = router;