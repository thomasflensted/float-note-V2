require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['https://float-note-backend.vercel.app/'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use('/api/notes', routes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening on port ", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })