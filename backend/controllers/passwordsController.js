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
    console.log(owner, email, password, site);
    try {
        const newPassword = await passwordModel.addNew(owner, email, password, site);
        res.status(200).json(newPassword);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

const delPassword = async (req, res) => {
    const { id } = req.body;

    console.log("Haslo do usuniecia: ",id);
    try{
        const delPassword = await passwordModel.delOne(id);
        res.status(200).json(delPassword);
    }catch(err){
        res.status(400).json({err: err.message});
    }
};

module.exports = {
    getAllPasswords,
    delPassword,
    addNewPassword
}