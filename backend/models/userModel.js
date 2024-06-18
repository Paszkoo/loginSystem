const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: "users"
})

userSchema.statics.signup = async function(email, password) {

    //validation
    if( !email || !password ) {
        throw Error("Wszystkie pola musza byc wypelnione");
    }
    if( !validator.isEmail(email) ){
        throw Error("Email niepoprawny");
    }
    if( !validator.isStrongPassword(password) ){
        throw Error("Haslo nie jest wystarczajaco silne");
    }

    const exists = await this.findOne({email: email});

    if( exists ) {
        throw Error("Email w uzyciu!");
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email: email, password: hash});

    return user;

};

    //static login method
userSchema.statics.login = async function(email, password){
        // uzytkownik nie podal hasla lub emaila
    if( !email || !password ) {
        throw Error("Wszystkie pola musza byc wypelnione");
    }

    const user = await this.findOne({email});

        // uzytkownik nie istnieje
    if(!user){
        throw Error("Uzytkownik nie istnieje");
    }

        // odszyfrowanie hasla i porwnanie do podanego od uzytkownika
    const match = await bcrypt.compare(password, user.password);

        // jezeli haslo nie pasuje - blad
    if(!match){
        throw Error("Zle haslo");
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);