exports.signUp = function() {

  app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.sName;
    const email = req.body.email;

    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields:{
                  FNAME: firstName,
                  LNAME: lastName
                }
        }]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/a56a5f5f87" ;
    const options = {
      method : "POST",
      auth : "methindu:ffc51a6a44c295f58242928e458f4b9d-us1"
    };

    const request = https.request(url, options, function(response){
      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      });

    });

    request.write(jsonData);
    request.end();
  });

  app.post("/failure", function(req, res){
    res.redirect("/");
  });
}




//API key
//ffc51a6a44c295f58242928e458f4b9d-us1

//List ID
//a56a5f5f87
