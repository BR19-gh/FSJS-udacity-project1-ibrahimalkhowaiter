"use strict";
exports.__esModule = true;
exports["default"] = {
    validateImageParams: function (req, res, next) {
        var imageId;
        var width;
        var height;
        if (!req.query.imageId) {
            return res.status(400).send("Can't proceed without Image ID");
        }
        else {
            imageId = req.query.imageId;
        }
        if (req.query.width && Number(req.query.width) <= 0) {
            return res.status(400).send("Invalid \"width\" value: " + req.query.width);
        }
        else {
            width = Number(req.query.width);
        }
        if (req.query.height && Number(req.query.height) <= 0) {
            return res.status(400).send("Invalid \"height\" value: " + req.query.height);
        }
        else {
            height = Number(req.query.width);
        }
        res.locals.imageId = imageId;
        res.locals.width = width;
        res.locals.height = height;
        next();
    }
};
