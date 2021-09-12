"use strict";
exports.__esModule = true;
var swaggerJSDoc = require("swagger-jsdoc");
var JSDocOptions = require("../../../root/swaggerJSDocs");
var imagesHandler_1 = require("./partials/imagesHandler");
function default_1(app) {
    app.use("/api/image", imagesHandler_1["default"]);
    app.set('view engine', 'ejs');
    app.get("/api-docs.json", function (req, res) {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerJSDoc(JSDocOptions));
    });
    app.use(function (err, req, res, next) {
        try {
            if (Object.prototype.hasOwnProperty.call(err, "status")) {
                return res.status(err.status || 500).send(err.message || err);
            }
            else {
                var parsedError = JSON.parse(err.message);
                return res.status(parsedError.status || 500).send(parsedError.message || err.message || "Unknown Error");
            }
        }
        catch (e) {
            return res.status(err.status || 500).send(err.message || err);
        }
    });
}
exports["default"] = default_1;
