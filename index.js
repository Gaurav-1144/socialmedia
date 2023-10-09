const express = require('express');
const cookie_parser = require('cookie-parser');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookies
const session  = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategies');
const sassMiddleware = require('node-sass-middleware');
const MongoStore = require('connect-mongo')(session);
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookie_parser());
app.use(express.static('./assets'));
app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');
// Mongo store is used to store session cookies in the db
app.use(session({
    name:'codeial',
    // TODO to change the secret before the deployment in the production
    secret:'testpassport',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disable'
    },
    function(err){
        console.log(err);
    }
    )  
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