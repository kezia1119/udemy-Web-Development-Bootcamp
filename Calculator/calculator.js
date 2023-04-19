const express =  require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html");
});


app.post("/",function(req, res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1+num2;
    res.send("The number calculator result is "+result );
});


app.get("/bmiCalculator", function(req, res){
    res.sendFile(__dirname +"/bmiCalculator.html");
})

app.post("/bmiCalculator",function(req, res){
    console.log(req.body);
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);
    var BMIResult = Math.floor(weight/(height*height));
    res.send("Your BMI is "+BMIResult );
});

app.listen(3000, function(req, res){
    console.log("calculator serer is running on port 3000");
});