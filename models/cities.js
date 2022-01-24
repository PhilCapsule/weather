var mongoose = require('./connection')

var citySchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_max: Number,
    temp_min: Number,
})

var cityModel = mongoose.model('cities', citySchema)

module.exports = cityModel; 

