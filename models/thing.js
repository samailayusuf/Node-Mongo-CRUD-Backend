const mongoose = require ('mongoose');

//defining the thing schema
const thingSchema = mongoose.Schema(
    {
        title: {type:String, required:true},
        description: {type:String, required:true},
        imageUrl: {type:String, required:true},
        userId: {type:String, required:true},
        price: {type:Number, required:true},
    }
);

module.exports = mongoose.model('Thing', thingSchema);
