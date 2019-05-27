const $$validation = require('./$$validation');
const INTERNAL_ERROR = 500;

module.exports = function (app, server) {
    app.use(function (err, req, res, next) {
        return res.status(INTERNAL_ERROR).send(new $$validation(err));
    });

    process.on('unhandledRejection', (error, promise) => {
        //some log
        promise.reject(new $$validation(error));
    });

    process.on('uncaughtException', (err) => {
        //some log
        process.nextTick(_ => process.exit(1));
    });
}