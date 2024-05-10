const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/index.ejs");
  res.render("index");
});

app.post("/", function (req, res) {
  const searchCity = req.body.search;
  const appid = "889219a3a6ee186918d53b7bad5dc740";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchCity +
    "&appid=" +
    appid +
    "&units=" +
    units;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon; //cropping the icon id
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@4x.png"; //storing the image url

      res.render("weatherResult", {
        searchCity: searchCity,
        temp: temp,
        imageUrl: imageUrl,
        weatherDescription: weatherDescription,
      });
      // res.write("<h1>Current Temperature in "+ searchCity +" : " + temp + " Celcius.</h1>");
      // res.write("<h3>The Weather is Currently : "+ weatherDescription + ".</h3>");
      // res.write("<img src="+ imageUrl + ">");    //sending the icon to the browser.
      res.send();
    });
  });
});

// ==============================================================================================================================
app.post("/signUp", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.sName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/a56a5f5f87";
  const options = {
    method: "POST",
    auth: "methindu:ffc51a6a44c295f58242928e458f4b9d-us1",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

// ==============================================================================================================================
app.listen(process.env.PORT || 5000, function () {
  console.log("Server started on heroku sever or port 5000. !");
});
