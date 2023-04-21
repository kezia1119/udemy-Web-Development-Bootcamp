const express = require("express");
const bodyParser = require("body-parser");
const date = require( __dirname + "/date.js")

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {

    const day = date.getDate();


    res.render("list", {
        listTitle: day,
        newItems: items
    });
});

app.post("/", function (req, res) {

    console.log(req.body);
    const item = req.body.addToDoList;

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }



});

app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "work List",
        newItems: workItems
    });
});

app.post("/work", function(req, res){
    const item = req.body.addToDoList;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res){
    res.render("about");
});


app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
});