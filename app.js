var http = require('http');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

//static lockfiles
app.use(express.static('./public'));
let apiKey = '******************';
let city = 'london';
  http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},GB&appid=${apiKey}&units=metric`, function(response){

    var info = "";
    response.on("data",function(chunk){
     info += chunk;
    });

    response.on("end",function(){
      if(response.statusCode === 200){
      //  console.log(typeof(data));
        try{
          //parsing the string into JSON object
         app.get('/', function(req,res){
           var data = JSON.parse(info);
          //data.list[0].main;
           var datas = {temp: data.list[0].main.temp, humidity: data.list[0].main.humidity,
             main: data.list[0].weather[0].main, description: data.list[0].weather[0].description,
              dt_txt: data.list[0].dt_txt, pressure: data.list[0].main.pressure,
              temp2: data.list[2].main.temp, humidity2: data.list[2].main.humidity,
              dt_txt2: data.list[2].dt_txt, pressure2: data.list[2].main.pressure,
              temp3: data.list[10].main.temp, humidity3: data.list[10].main.humidity,
              dt_txt3: data.list[10].dt_txt, pressure3: data.list[10].main.pressure,
              temp4: data.list[19].main.temp, humidity4: data.list[19].main.humidity,
              dt_txt4: data.list[19].dt_txt, pressure4: data.list[19].main.pressure,
              temp5: data.list[28].main.temp, humidity5: data.list[28].main.humidity,
              dt_txt5: data.list[28].dt_txt, pressure5: data.list[28].main.pressure};

              //console.log( Math.round(datas.temp));
          res.render('index', {datas: datas});
           });
        }catch(error){
          console.log("sorry wrong try");
        }
      }else{
        console.log('sorry something wrong');
      }
    });
  });

    //listen to port
  app.listen(3000);
