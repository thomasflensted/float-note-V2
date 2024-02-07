require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const mongoose = require('mongoose');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://float-note.onrender.com/api/notes");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
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