require('dotenv').config()
const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const { CORS_URL } = require('./corsURL');

const app = express();

app.use(express.json());
const corsOptions = {
    origin: CORS_URL
};
app.use(cors());
app.use('/api/notes', noteRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening on port ", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })