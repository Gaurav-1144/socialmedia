const express = require('express');
const cookie_parser = require('cookie-parser');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
require('./config/mongoose');
// used for session cookies
const session  = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategies');
app.use(express.urlencoded());
app.use(cookie_parser());
app.use(express.static('./assets'));
app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'codeial',
    secret:'testpassport',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }

    console.log(`Server is running on port:${port}`);
})