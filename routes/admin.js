const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

//admin login page
router.get('/login', (req, res) => res.render('admin_login'));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/admin/admin_login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logout');
    res.redirect('/admin/admin_login');
});



module.exports = router;