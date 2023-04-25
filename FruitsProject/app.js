const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/fruitDB");

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "why no name?"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const watermelon = new Fruit({name: "Watermelon", rating: 8, review: "Too sour"});
const pitch = new Fruit({name: "Pitch", rating: 9, review: "Great"});
const litchi = new Fruit({name: "Litchi", rating: 7, review: "Nice"});

watermelon.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//     name: "Amy",
//     age: 28,
//     favoriteFruit: pineapple
// });

Person.updateOne({name:"John"},{favoriteFruit:watermelon}).then(function(documents){
    console.log(documents);
}) .catch(function (err) {
    console.log(err);
});





// person.save();

// Fruit     .insertMany([pineapple,pitch,litchi])     .then(function (docs) {
// console.log("Successfully");     })     .catch(function (err) {
// console.log(err);     }); pineapple.save();

// Fruit
//     .countDocuments()
//     .then(function (count) {
//         console.log(count);
//     });

// Fruit.find({}, {/*name: 1,_id: 0*/     })     .then(function (documents) {
// console.log(documents);         documents.forEach(function (documents) {
// console.log(documents.name);             mongoose .connection .close();   });
//     }); const count = Fruit.countDocuments({name: "Pitch"}); Fruit
// .deleteMany({name: "Pitch"}) .then(function (documents) {
// console.log("${count}");     });