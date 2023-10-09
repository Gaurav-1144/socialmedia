const User = require('../models/user');
module.exports.profile =   async function (req,res){
console.log(req.cookies.user_id);
    if(req.cookies.user_id){
       let checkUser =   await User.findById(req.cookies.user_id);
      console.log( checkUser);
       if(checkUser){
           return res.render('user_profile',{
                title:'Profile Page',
                user:await checkUser
            });
       } else{
        return res.redirect('/users/sign-in');
       }
    } else {
        return res.redirect('/users/sign-in');
    }
}

// render sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_profile_signup',{
        title:'Codeial | Signup'
    });
}
// render sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
        return res.render('user_profile_signin',{
        title:'Codeial | SignIn'
       });   
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

// get sign up data
module.exports.create = async function (req,res){
    if (req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    let user = await User.findOne({email:req.body.email});
        if(!user){
           let create =  await User.create(req.body);
                if(create == null){
                    console.log("error");
                }
                console.log("Created");
                return res.redirect('/users/sign-in');
            }
         else {
            console.log("Email id already Availbale");
            return res.redirect('back');
        }
    };

// get sign up data
module.exports.createsession = async function(req,res){
   // return res.redirect('/');
    let user = await User.findOne({email:req.body.email});
    if(!user){
        console.log("Invalid User");
        return res.redirect('back');
    } else {
        if(user.password === req.body.password){
            res.cookie('user_id',user.id);
            console.log("Welcome");
            return res.redirect('/users/profile');
        } else {
            console.log("Password Wrong");
            return res.redirect('back');
        }
    }
}