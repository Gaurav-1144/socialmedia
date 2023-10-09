const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.get('/sign-out',userController.destroySession);
router.post('/create',userController.create);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createsession);
console.log(`Route is loading`);
module.exports = router;