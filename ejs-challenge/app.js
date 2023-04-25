//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

const homeStartingContent = "hea1 content";
const aboutContent = "head2 content";
const contactContent = "head3 content";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-kezia:Test123@cluster0.0kleyew.mongodb.net/myBlogsDB");

const postSchema = new mongoose.Schema({title: String, content: String});

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
    Post.find({})
        .then(function (foundPost) {
            const posts = foundPost;
            res.render("home", {
                FirstContent: homeStartingContent,
                posts: posts
            });
        });
});

app.get("/about", function (req, res) {
    res.render("about", {AContent: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", {CContent: contactContent});
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = new Post({title: req.body.postTitle, content: req.body.postBody});
    post
        .save()
        .then(function () {
            res.redirect("/");
        })

});

app.get("/posts/:postId", function (req, res) {
    const requestedPostId = req.params.postId;
    Post
        .findOne({_id: requestedPostId})
        .then(function (post) {
            res.render("post", {
                title: post.title,
                content: post.content
            })
        }).catch(function(err){
            console.log(err);
        });

});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
