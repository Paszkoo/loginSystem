const passwordModel = require("../models/passwordModel");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

const getAllPasswords = async (req,res) => {
    const { email } = req.body;
    try {
        const passwords = await passwordModel.getAll(email);
        
        if(passwords.length > 0) {
            res.status(200).json(passwords);
        }else{
            res.status(400).json({err: "No passwords found"});
        }
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

const addNewPassword = async (req, res) => {
    const { owner, email, password, site } = req.body;
    try {
        const newPassword = await passwordModel.addNew(owner, email, password, site);
        res.status(200).json(newPassword);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

module.exports = {
    getAllPasswords
}