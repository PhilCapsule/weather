var express = require('express');
var router = express.Router();
var request = require('sync-request');

var cityModel = require('../models/cities');
var userModel = require('../models/users');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/weather', async function(req,res,next){
  var cityList = await cityModel.find();

  res.render('weather', {cityList})
})

/*---- AddCity -----*/
router.post('/add-city',async function(req,res,next){
  
  var data = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=578e4c04f9050d4e61bd79ac5f3c583e`)
  var dataAPI = JSON.parse(data.body)

  var alreadyExist = await cityModel.findOne({
    name: req.body.newcity.toLowerCase()
  });

  
  if(alreadyExist == null && dataAPI.name){
    var newCity = new cityModel({
      name: req.body.newcity,
      desc: dataAPI.weather[0].description,
      img:  "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
      temp_max: dataAPI.main.temp_max,
      temp_min: dataAPI.main.temp_min,
    })
    await newCity.save();
  }

  cityList = await cityModel.find(); // <-- refresh/maj DB for la save newCity.save for compare

  res.render('weather', {cityList})
})




/*---- delete city ------*/
router.get('/delete-city', async function(req,res,next){
  await cityModel.deleteOne({
    _id: req.query.id
  })
  var cityList = await cityModel.find();
  res.render('weather', {cityList})
})



/*-------  Update cities --------*/
router.get('/update-cities', async function(req,res,next){
  var cityList = await cityModel.find();

  for(var i=0;i<cityList.length;i++){
    var data = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=578e4c04f9050d4e61bd79ac5f3c583e`)
    var dataAPI = JSON.parse(data.body)

    await cityModel.updateOne({
      _id: cityList[i].id
    },{
      name: cityList[i].name,
      desc: dataAPI.weather[0].description,
      img: "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
    })
  }
  var cityList = await cityModel.find();
  res.render('weather',{cityList})

})

/*----- In# of sign-up --------*/
router.post('/sign-up', async function(req,res,next){

  var nemUser = new userModel({
    username: req.body.usernameFromFront,
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  })
  await newUser.save();
  res.redirect('/weather')
})

module.exports = router;
