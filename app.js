const express = require("express");
const app = express();
const http = require("node:http");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(receive,response){
  response.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
  var cityname = req.body.city;
  const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&q="+cityname+"&appid=ed0b29885084c2d0436769740bffa670#";
  http.get(url,function(response){
      response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      console.log(weatherdata.weather[0].description);
      const imgurl = ("http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png");
      res.write("<h1>The tempurature in"+cityname+" in degree Celcius is " + temp + "</h1>");
      res.write("<h1>The weather conditions in"+cityname+" are " + weatherdata.weather[0].description + "</h1>");
      res.write("<img src="+imgurl+">");
      res.end();})
    })
  })

app.listen(3000,function(){
  console.log("server is listneing up on the port 3000");
});
