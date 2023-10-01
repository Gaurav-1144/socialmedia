const express = require('express');
const cookie_parser = require('cookie-parser');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookie_parser());
app.use(express.static('./assets'));
app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }

    console.log(`Server is running on port:${port}`);
})