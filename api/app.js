const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

const routes = require("./routes")
const tokenSecurity = require("./tokenSecurity")
const exceptionHandling = require("./exceptionHandling")

const SERVER_PORT = 8126;

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
