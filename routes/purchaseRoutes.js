const express  = require('express');
const purchaseRouter = express.Router();
const {placePurchase, getBills} = require('../controller/purchaseController');

purchaseRouter.post('/',placePurchase);
purchaseRouter.get('/',getBills);

module.exports = purchaseRouter;