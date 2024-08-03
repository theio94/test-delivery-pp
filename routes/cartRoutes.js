const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.post('/active_carts',cartController.addItem)
router.get('/active_carts',cartController.viewCarts)

module.exports = router