var express = require('express');
var router = express.Router();
var request = require('sync-request')

var cityModel = require('./bdd')

//Fake
var cityList = [
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weather', function(req,res,next){
  res.render('weather', {cityList})
})

/*---- AddCity -----*/
router.post('/add-city',async function(req,res,next){
  
  var data = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=578e4c04f9050d4e61bd79ac5f3c583e`)
  var dataAPI = JSON.parse(data.body)

  console.log(dataAPI);

  var alreadyExist = false;

  for(var i=0; i<cityList.length;i++){
    if(req.body.newcity.toLowerCase() == cityList[i].name.toLowerCase()){
      alreadyExist= true;
    }
  }

  // &&dataAPI.name invalid false city
  if(alreadyExist == false && dataAPI.name){
    cityList.push({
      name: req.body.newcity,
      desc: dataAPI.weather[0].description,
      img:  "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
      temp_max: dataAPI.main.temp_max,
      temp_min: dataAPI.main.temp_min,
    })
  }


  res.render('weather', {cityList})
})

/*---- delete city ------*/
router.get('/delete-city', function(req,res,next){
  cityList.splice(req.query.position, 1)
  res.render('weather', {cityList})
})



module.exports = router;
