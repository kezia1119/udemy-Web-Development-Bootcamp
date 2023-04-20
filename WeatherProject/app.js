const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.CityName;
    const apiKey = "";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function (response) {
        response
            .on("data", function (data) {
                const weatherData = JSON.parse(data);
                const tmp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const iconId = weatherData.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
                res.write("<P>The weather is currently " + weatherDescription + ". </P>");
                res.write("<h1>The temperature now in"+ query +" is " + tmp + " degree</h1>");
                res.write("<img src=" + imageURL + ">");
                res.send();
            });
    })
});

app.listen(3000, function (req, res) {
    console.log(" app is running on port 3000");
});