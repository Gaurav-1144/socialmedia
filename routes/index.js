const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);
console.log(`Route is loading`);
module.exports = router;