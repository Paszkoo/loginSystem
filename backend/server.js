const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
require('dotenv').config()

const app = express();

// Middleware
app.use(express.json());
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    console.log("Polaczono z baza danych, nasluchuje na porcie ", PORT);
}).catch((error) => {
    console.log(error);
})

