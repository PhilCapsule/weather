var express = require('express');
var router = express.Router();

//Fake
var cityList = [
  {name:"Aberdeen", desc:"Couvert", img:"/images/picto-1.png", temp_min:-2, temp_max:17},
  {name:"AberdeenShire", desc:"Couvert", img:"/images/picto-1.png", temp_min:0, temp_max:15},
  {name:"Aberdeen", desc:"Couvert", img:"/images/picto-1.png", temp_min:3, temp_max:13},

]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weather', function(req,res,next){
  res.render('weather', {cityList})
})

module.exports = router;
