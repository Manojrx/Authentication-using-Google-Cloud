const productModel =require('../model/productsModel');
const userModel =require('../model/userModel');
const purchaseModel = require('../model/purchaseModel');

const mongoose = require('mongoose');

const placePurchase = async (req, res) => {
    try {
        var productId = req.body.productID;
        var purchasedBy = req.body.purchasedBy;
        var purchaseQuantity = req.body.quantity;
        // Validate Product
        const productData = await productModel.findById(productId);
        if (!productData) return res.status(404).json({ message: "No Product Found" })

        // Validate Availablity of Product
        const availableQuantity = productData.avilablity;
        if (purchaseQuantity <= 0 || purchaseQuantity > availableQuantity) {
            return res.status(404).json({ message: "Quantity Exceeds or not avilable" })
        }

        // Validate User.
        const userData = await userModel.findById(purchasedBy);
        if (!userData) return res.status(404).json({ message: "No User Found" });

        const purchase = new purchaseModel(req.body);
        await purchase.save();
        const availability = { avilablity: availableQuantity - purchaseQuantity };
        const updateProduct = await productModel.findByIdAndUpdate({ _id: productId }, { $set: availability }, { new: true });

        res.status(200).json({ "productDetail": updateProduct, "purchaseDetail": purchase });
    } catch (err) {
        return res.status(404).json({ message: "error" });
    }
};

const getBills = async (req, res) => {
    try {
        const searchText = req.query.searchText || '';
        let  sortField = req.query.sortField || 'address';
        let sortOrder  = 1;
        if (sortField.startsWith('-')) {
            sortOrder = -1;
            sortField = sortField.substring(1); // Remove the hyphen for the actual field name
        }

        if (searchText) {
            const productData = await productModel.find({
                $or: [
                    { productName: { $regex: searchText, $options: 'i' } }
                ]
            })
            const idpresent = productData.map(val => val._id);
            var searchCriteria = {
                $or: [
                    { address: { $regex: searchText, $options: 'i' } }, // Case-insensitive search
                    { productID: { $in: idpresent } }
                ]
            };

            if (mongoose.isValidObjectId(searchText)) {
                searchCriteria.$or.push({ productID: searchText, $options: 'i' });
            }
        }

        const purchases = await purchaseModel.find(searchCriteria)
        .populate({ path: 'productID', select: 'productName avilablity' })
        .sort({ [sortField] : sortOrder });

        const purchasedata = await purchaseModel.find(searchCriteria)
        .populate({ path: 'productID', select: 'productName avilablity' })
        .sort({ [sortField] : sortOrder })
        .limit(1);
        res.status(200).json({ count: purchases.length, items: purchasedata });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

module.exports = {placePurchase , getBills} ;