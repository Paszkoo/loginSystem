const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({err: 'You must be logged in'});
    }

    const token = authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({err: 'Nie ma tokenu' });
    }
    try{
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        console.log("token zaakceptowany, udzielam dostepu do danych...")
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({err: 'Request is not authorized'});
    }

};

module.exports = {
    requireAuth
}