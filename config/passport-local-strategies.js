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