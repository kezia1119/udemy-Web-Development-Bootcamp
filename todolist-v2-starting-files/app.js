//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-kezia:Test123@cluster0.0kleyew.mongodb.net/todolistDB");

const itemSchema = new mongoose.Schema({name: String});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({name: "buyFood"});
const item2 = new Item({name: "cookFood"});
const item3 = new Item({name: "eatFood"});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({name: String, items: [itemSchema]});

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {

    Item
        .find({})
        .then(function (data) {
            if (data.length === 0) {
                Item
                    .insertMany(defaultItems)
                    .then(function () {
                        console.log("Succeed");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                res.redirect("/");
            } else {
                res.render("list", {
                    listTitle: "Today",
                    newListItems: data
                });
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    app.get("/:customListName", function (req, res) {
        const customListName = _.capitalize(req.params.customListName);

        List
            .findOne({name: customListName})
            .then(function (foundList) {

                if (!foundList) {
                    // create a new list
                    const list = new List({name: customListName, items: defaultItems});

                    list.save();

                    res.redirect("/"+customListName);

                } else {
                    // show an exist list
                    res.render("list", {
                        listTitle: foundList.name,
                        newListItems: foundList.items
                    });
                }
            });

    });

});

app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({name: itemName});

    if (listName === "Today"){
      item.save();
      res.redirect("/");
    }else{
      List.findOne({name: listName}).then(function(foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
    };

});

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    console.log(listName);

    if (listName === "Today"){
      Item
          .findByIdAndRemove({_id: checkedItemId})
          .then(function () {
            res.redirect("/");
          })
          .catch(function (err) {
              console.log(err);
          });
    }else{
      List
          .findOneAndUpdate({name: listName}, {$pull: {items:{_id: checkedItemId}}})
          .then(function () {
              console.log("deleted !");
              res.redirect("/"+listName);
          })
          .catch(function (err) {
              console.log(err);
          });
    }

});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
