const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
productName :{type : String, required: true}, 
productQuantity :{type : Number, required: true}, 
price  : {type : Number, required: true}, 
avilablity  : {type : Number, required: true}, 
});
const product = mongoose.model('product',productschema)

module.exports = product ; 