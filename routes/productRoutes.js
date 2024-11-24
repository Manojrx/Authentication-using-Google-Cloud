const express = require('express');
const productRouter = express.Router();
const {getAllproducts, createProduct, updateProduct, deleteProduct} = require('../controller/productController');

productRouter.get('/',getAllproducts);
productRouter.post('/',createProduct);
productRouter.put('/:id',updateProduct);
productRouter.delete('/:id',deleteProduct);


module.exports = productRouter;