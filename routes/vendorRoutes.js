const express = require('express')
const router = express.Router()
const vendorController = require('../controllers/vendorController')

router.get('/vendors', vendorController.getVendors)
router.get('/:menuName', vendorController.getMenu)
router.post('/vendors', vendorController.getVendor)

module.exports = router
