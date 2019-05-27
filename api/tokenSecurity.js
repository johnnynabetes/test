const $$validation = require('./$$validation');
const verifier = require('google-id-token-verifier');
const clientId = '353081789428-ndgpvpjn89pupcke2c2hhm4qfsb2p18h.apps.googleusercontent.com';
const COD_UNAUTOTHORIZED = 401;

function validate(req, res, next) {
    const token = req.header('authorization');
    verifier.verify(token, clientId, function (err, tokenInfo) {
        if (err)
            return res.status(COD_UNAUTOTHORIZED).send(new $$validation("Invalid token"));
        next();
    });
}

module.exports = function (app) {
    app.use(validate);
}