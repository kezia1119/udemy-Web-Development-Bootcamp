//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor nequ" +
        "e vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tel" +
        "lus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultric" +
        "es tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at era" +
        "t pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus m" +
        "auris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenati" +
        "s lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismo" +
        "d lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis " +
        "at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vest" +
        "ibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum " +
        "lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pre" +
        "tium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semp" +
        "er risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae t" +
        "ortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae" +
        ". Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra " +
        "justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing" +
        " elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sap" +
        "ien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum variu" +
        "s sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum do" +
        "lor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque." +
        " Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fri" +
        "ngilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam lib" +
        "ero.";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home", {
        FirstContent: homeStartingContent,
        posts: posts
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
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");

});

app.get("/posts/:value", function (req, res) {
    const checkTitle = _.lowerCase(req.params.value);

    posts.forEach(function (post) {
      const storedTitle = _.lowerCase(post.title);

      if (checkTitle === storedTitle) {
          res.render("post",{
              title: post.title,
              content: post.content
          })
        }
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
