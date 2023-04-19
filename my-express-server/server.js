
const express = require("express");
const app = express();


app.get("/", function(req, res){
    res.send("Hello");
})

app.get("/contact", function(req, res){
    res.send("Contact me at : ek60826@gmail.com");
})

app.get("/about", function(req, res){
    res.send("<h1>About me</h1>"+"<p> Something about me is none if your business</p>")
})

app.get("/hobbies",function(req, res){
    res.send("PIZZA!!!");
})

app.listen(3000,function(){
    console.log("Sever started on port 3000");
})