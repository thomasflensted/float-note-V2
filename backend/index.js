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
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://float-note.onrender.com/"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

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