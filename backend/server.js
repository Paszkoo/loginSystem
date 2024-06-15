const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const passwordsRoutes = require('./routes/passwords');
const { encryptPassword, decryptPassword } = require('./encryption/encryption');
require('dotenv').config()

const app = express();

let pass = "abcd!"
console.log(pass);
let crypted = encryptPassword(pass)
console.log(crypted);
let decrypted = decryptPassword(crypted);
console.log(decrypted);

// Middleware
app.use(express.json());

app.use('/api/user', userRoutes);

app.use('/api/passwords', passwordsRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    console.log("Polaczono z baza danych, nasluchuje na porcie ", PORT);
}).catch((error) => {
    console.log(error);
})

