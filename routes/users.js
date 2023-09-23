const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);
console.log(`Route is loading`);
module.exports = router;