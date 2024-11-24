
const User1 = require('../model/userModel');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User1.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET  users by ID .
const getByID = (async(req,res) =>{
  try{
    const data = await User1.findById(req.params.id);
    res.status(200).json({data}) ;
  }catch(err){
    if(!data) return res.status(404).json({message: 'ID not found '});
  }
});

// POST create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User1(req.body);
    await newUser.save();
    res.status(201).json(newUser._id);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// PATCH update a user
const updateUser = async (req, res) => {
  try {
    const user = await User1.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a user
const deleteUser = async (req, res) => {
  try {
    const user = await User1.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getByID,
  createUser,
  updateUser,
  deleteUser
};
