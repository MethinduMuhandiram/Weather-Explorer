
exports.api = function(){

  response.on('data', function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description ;
    const icon = weatherData.weather[0].icon ;    //cropping the icon id
    const imageUrl = "http://openweathermap.org/img/wn/"+ icon + "@4x.png";    //storing the image url

    res.write("<h1>Current Temperature in "+ searchCity +" : " + temp + " Celcius.</h1>");
    res.write("<h3>The Weather is Currently : "+ weatherDescription + ".</h3>");
    res.write("<img src="+ imageUrl + ">");    //sending the icon to the browser.
  });
};
