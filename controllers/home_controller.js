module.exports.home = function(req,res){
     console.log(req.cookies);
    
     // alter cookies
     res.cookie('user_id',50);
    return res.render('home',{
        title:'Home'
    });
    // return res.end('<h1>Controller is Working Now</h1>')
}