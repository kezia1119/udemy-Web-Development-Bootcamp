const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = new mongoose.Schema({title: String, content: String});

const Article = mongoose.model("Article", articleSchema);

//request targeting for all articles

    .route("/articles")
    .get(function (req, res) {
        Article
            .find({})
            .then(function (result) {
                res.send(result);
            })
            .catch(function (err) {
                res.send(err);
            });
    })
    .post(function (req, res) {
        const newArticle = new Article({title: req.body.title, content: req.body.content});
        newArticle
            .save()
            .then(function (saved) {
                res.send("Successfully");
            })
            .catch(function (err) {
                res.send(err);
            });
    })
    .delete(function (req, res) {
        Article
            .deleteMany({})
            .then(function () {
                res.send("Deleted all");
            })
            .catch(function (err) {
                res.send(err);
            });
    });

//request targeting a specific article

app
    .route("/articles/:articleTitle")
    .get(function (req, res) {
        Article
            .findOne({title: req.params.articleTitle})
            .then(function (result) {
                if (result) {
                    res.send(result);
                } else {
                    res.send("No article matching that title was found.")
                }
            })
            .catch(function (err) {
                res.send(err);
            })
    })
    .put(function (req, res) {
        Article.findOneAndUpdate({
            title: req.params.articleTitle
        }, {
            title: req.body.title,
            content: req.body.content
        }, {overwrite: true})
            .then(function () {
                res.send("Successfully updated article");
            })
            .catch(function (err) {
                res.send(err);
            })
    })
    .patch(function (req, res) {
        Article.findOneAndUpdate({
            title: req.params.articleTitle
        }, {
            $set: req.body
        }, {overwrite: true})
            .then(function () {
                res.send("Successfully updated article");
            })
            .catch(function (err) {
                res.send(err);
            })
    })
    .delete(function (req, res) {
        Article
            .deleteOne({title: req.params.articleTitle})
            .then(function () {
                res.send("Deleted title " + req.params.articleTitle + " article.");
            })
            .catch(function (err) {
                res.send(err);
            })
    });

app.listen(3000, function () {
    console.log("Website is running on port 3000!");
});
