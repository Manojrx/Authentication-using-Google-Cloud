const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new mongoose.Schema({
    productID: {type: Schema.Types.ObjectId ,ref: "product",required:true },
    purchasedOn:{ type: Date, default: Date.now },
    purchasedBy: {type: Schema.Types.ObjectId ,ref: "User",required:true },
    quantity:{ type: Number, required: true }, 
    address:{type :String , required:true },
    grade :{type :String , required:true }
});

const purchase = mongoose.model("purchase",purchaseSchema) ;

module.exports = purchase ;