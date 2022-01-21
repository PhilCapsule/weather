var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://Philippe:Wp8SX5nSLkTaYf92@cluster0.rrtpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err);
    }
)

var citySchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_max: Number,
    temp_min: Number,
})

var cityModel = mongoose.model('cities', citySchema)

module.exports = cityModel; 

