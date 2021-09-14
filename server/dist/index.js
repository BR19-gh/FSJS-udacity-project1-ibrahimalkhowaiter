"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var fs = require("fs");
var express = require("express");
var debug = require("debug");
var helmet = require("helmet");
var morgan = require("morgan");
var engines = require("consolidate");
var routes_1 = require("./routes/routes");
var log = debug('app:main');
var httpLog = debug('app:endpoint');
var app = express();
var APP_PORT = process.env.APP_PORT || 3030;
var server;
log('Main dependencies loaded');
app.get('/', function (req, res) {
    res.sendFile('views/index.html', { root: __dirname });
});
if (process.env.LOCAL_HTTPS) {
    server = require('https').createServer({
        key: fs.readFileSync('./root/certificates/local/localhost-privkey.pem'),
        cert: fs.readFileSync('./root/certificates/local/localhost-cert.pem'),
        rejectUnauthorized: false
    }, app);
}
else {
    server = require('http').createServer(app);
}
if (httpLog.enabled) {
    app.use(morgan('combined', {
        stream: {
            write: function (msg) { return httpLog(msg.trimEnd()); }
        }
    }));
}
app.engine('html', engines.ejs);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client');
app.use(express.urlencoded({
    extended: true,
    limit: '3mb'
}));
app.use(express.json({ limit: '3mb' }));
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use('/docs/api', express.static('./docs/api/swagger-ui-dist'));
app.use('/docs/js', express.static('./docs/js'));
log("Express' plugins loaded");
server.listen(APP_PORT, function () {
    routes_1["default"](app);
    return log(process.env.LOCAL_HTTPS
        ? "Server running successfully at https://localhost:" + APP_PORT
        : "Server running successfully at port " + APP_PORT);
});
exports["default"] = server;
