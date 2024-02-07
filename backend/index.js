require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const mongoose = require('mongoose');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
const corsOptions = {
    origin: "https://float-note.onrender.com", //"https://float-note.onrender.com" SET TO THIS URL WHEN DEPLOYING
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
app.use('/api/notes', routes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening on port ", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })