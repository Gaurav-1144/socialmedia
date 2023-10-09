const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authication using passport

passport.use(new LocalStrategy({
    usernameField:'email'
},
async function(email,password,done){
    // find the user establish the identity
    var user = await User.findOne({email:email});
    if (!user || user.password!=password ){
        console.log("Invalid Password");
        return done(null,false);
    }
    return done(null,user);
}
))

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
   var user =  User.findOne(id);
   if (!user){
    console.log("Invalid Password");
    return done(null,false);
}

return done(null,user);
   
})

// check if the user is authication

passport.checkAuthentication = function(req,res,next){
    // if the user is signin pass the request next function
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not login in

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
