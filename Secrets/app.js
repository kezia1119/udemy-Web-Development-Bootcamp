//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
//cookie needs
const session = require('express-session')
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//cookie needs google login needs
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
//google login needs
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//cookie needs
app.use(session({secret: 'Our Little Secret.', resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());
//cookie needs

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({email: String, password: String, googleId: String, secret: String});

//cookie needs
userSchema.plugin(passportLocalMongoose);
//cookie needs google login needs
userSchema.plugin(findOrCreate)
//google login needs

const User = new mongoose.model("User", userSchema);

//cookie needs
passport.use(User.createStrategy());

// only for local user passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser()); cookie needs google login
// needs google login needs
passport.serializeUser(function (user, cb) {
    process
        .nextTick(function () {
            return cb(null, {
                id: user.id,
                username: user.username,
                picture: user.picture
            });
        });
});

passport.deserializeUser(function (user, cb) {
    process
        .nextTick(function () {
            return cb(null, user);
        });
});

//google login needs google login needs
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, function (accessToken, refreshToken, profile, cb) {
    User
        .findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
}));
//google login needs

app.get("/", function (req, res) {
    res.render("home");
});

//google login needs
app.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));

app.get("/auth/google/secrets", passport.authenticate("google", {failureRedirect: "/login"}), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});

//google login needs

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/secrets", function (req, res) {
    User
        .find({
            "secret": {
                $ne: null
            }
        })
        .then(function (foundUsers) {
            if (foundUsers) {
                res.render("secrets", {usersWithSecrets: foundUsers});
            } else if (err) {
                console.log(err);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.get("/logout", function (req, res) {

    //logout function come from passport package
    req
        .logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
});

app.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    };
});

app.post("/register", function (req, res) {

    User
        .register({
            username: req.body.username
        }, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.render("register");
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/secrets");
                });
            }
        });

});

app.post("/login", function (req, res) {
    const user = new User({username: req.body.username, password: req.body.password});

    //login function come from passport package
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        }
    });

});

app.post("/submit", function (req, res) {
    const userSecret = req.body.secret;

    User
        .findById({_id: req.user.id})
        .then(function (result) {
            if (result) {
                result.secret = userSecret;
                result.save();
                res.redirect("/secrets");
            } else if (err) {
                console.log(err);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});