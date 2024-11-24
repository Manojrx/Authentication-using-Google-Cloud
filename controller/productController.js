const productModel =require('../model/productsModel');

const getAllproducts = async (req,res) =>{
    try{
        console.log("in controller");
        const allData = await productModel.find();
        res.status(200).json(allData);
    }catch(err){
        return res.status(404).json({message : 'No Datas Found'});
    }
};
const createProduct = async (req,res) =>{
    try{
        const productObj = new productModel(req.body);
        await productObj.save();
        res.status(200).json(productObj);
    }catch(err){
        return res.status(404).json({message : 'No Datas Found'});
    }
};
const updateProduct = async (req, res) => {
    try {
      const user = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ message: 'Product not found' });
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
 
const deleteProduct = async (req, res) => {
    try {
      const user = await productModel.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
module.exports = {
    getAllproducts ,
    createProduct ,
    updateProduct ,
    deleteProduct 
};