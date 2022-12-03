const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

//load User Model
const User=require('../models/User');
const Admin = require('../models/Admin');


// Admin Authentication



// User Authentication
module.exports=function(passport){
    console.log("User Authentication");
    passport.use(
        new LocalStrategy({ usernameField:'email'},(email,password,done)=>{
        //match User
        User.findOne({email:email})
        .then(user=>{
            if(!user){
                return done(null,false,{message:'That email is not registered'});
            }
            //Match Password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;

                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{message:'Password incorrect'});
                }
            });
        })
        .catch(err=>console.log(err));
        })
    );
  
passport.serializeUser((user,done)=>{
done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
     done(err,user);
    });
});
}

module.exports=function(passport){
    console.log("Admin Authentication");
    passport.use(
        new LocalStrategy({ usernameField:'email'},(email,password,done)=>{
        //match User
        Admin.findOne({email:email})
        .then(admin=>{
            if(!admin){
                return done(null,false,{message:'That email is not registered'});
            }
            //Match Password
            if(password==admin.password){
                return done(null,admin);
            }else{
                return done(null,false,{message:'Password incorrect'});
            }
            // bcrypt.compare(password,user.password,(err,isMatch)=>{
            //     if(err) throw err;

            //     if(isMatch){
            //         return done(null,user);
            //     }else{
            //         return done(null,false,{message:'Password incorrect'});
            //     }
            // });
        })
        .catch(err=>console.log(err));
        })
    );
  
passport.serializeUser((admin,done)=>{
done(null,admin.id);
});
passport.deserializeUser((id,done)=>{
    Admin.findById(id,(err,admin)=>{
     done(err,admin);
    });
});
}
