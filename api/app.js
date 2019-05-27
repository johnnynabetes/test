const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes")
const tokenSecurity = require("./tokenSecurity")
const exceptionHandling = require("./exceptionHandling")

const SERVER_PORT = 8126;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

tokenSecurity(app);
routes(app);

const server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(SERVER_PORT, () => {
    console.log('Server started at https://localhost:' + SERVER_PORT);
});

exceptionHandling(app, server);
