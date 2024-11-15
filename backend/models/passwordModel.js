const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { encryptPassword, decryptPassword } = require('../encryption/encryption');

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: "passwords",
})

passwordSchema.statics.getAll = async function(email){
    const passwords = await this.find({ owner: email});
    console.log("Wysylam znalezione hasla do uzytkownika...");
    for( const p of passwords ){
        const dectrypt = await decryptPassword(p.password);
        p.password = dectrypt;
    }
    return passwords;
}
passwordSchema.statics.addNew = async function(owner, email, password, site){
    
    const hash = await encryptPassword(password);
    const newPassword = await this.create({ owner: owner, email: email, password: hash, site: site});

    return newPassword;
}

passwordSchema.statics.delOne = async function(id) {

    console.log("id w schmeacie",id);
    const delPassword = await this.findByIdAndDelete(id).exec();
    return delPassword;
}

module.exports = mongoose.model('Password', passwordSchema);