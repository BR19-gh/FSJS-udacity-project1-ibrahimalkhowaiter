'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var fsAsync = require("fs/promises");
var sharp = require("sharp");
var FULL_IMAGES_PATH = './images/full';
var PROCESSED_IMAGES_PATH = './images/processed';
exports["default"] = {
    /**
     *  @type {string}
     */
    imageId: '',
    /**
     *  @type {number}
     */
    width: 0,
    /**
     *  @type {number}
     */
    height: 0,
    /**
     *  @type {boolean}
     */
    isOriginal: true,
    /**
     * Calculates the stock image path based on a constant and image ID.
     *
     * @method getStockImagePath
     * @return {string} - The stock image path.
     */
    getStockImagePath: function () {
        return FULL_IMAGES_PATH + "/" + this.imageId;
    },
    /**
     * Calculates the processed image path based on a constant, combination of width and height, and the image ID.
     *
     * @method getImagePath
     * @return {string} - The processed image path.
     */
    getImagePath: function () {
        return this.isOriginal
            ? this.getStockImagePath()
            : PROCESSED_IMAGES_PATH + "/" + this.width + "x" + this.height + "/" + this.imageId;
    },
    /**
     * .
     *
     * @method readImageStream
     * @throws It will throw a `404 - Not found` error if the `imageId` could not be found within the target image folder.
     * @return {Stream} - The image readable stream.
     */
    readImageStream: function () {
        try {
            return fs.createReadStream(this.getImagePath());
        }
        catch (e) {
            throw new Error(JSON.stringify({
                status: 404,
                message: 'Image not found.'
            }));
        }
    },
    checkIfOriginalImageExists: function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fsAsync.open(this.getStockImagePath(), 'r')];
                    case 1:
                        fileData = _a.sent();
                        return [4 /*yield*/, fileData.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    checkIfTransformedImageExists: function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileData, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fsAsync.open(this.getImagePath(), 'r')];
                    case 1:
                        fileData = _a.sent();
                        return [4 /*yield*/, fileData.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Create a Sharp Image instance based on a stock image and return the file instance.
     * If the transformed image already exists, it will be served from cache instead.
     *
     * @constructor
     * @method init
     * @async
     * @param {string} imageId - The image ID.
     * @param {number} [width=0] - The image desired width.
     * @param {number} [height=0] - The image desired height.
     * @throws It will throw a `400 - Bad request` error if the `imageId` parameter is not available.
     * @throws It will throw a `404 - Not found` error if the `imageId` could not be found within the stock image folder.
     * @throws It will throw a `500 - Internal server` error if some processing issue happens.
     * @return {SharpImage} - The constructed file representation.
     */
    init: function Constructor(imageId, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var originalImageExists, transformedImageExists, originalImageExists, fileData, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!imageId) {
                            throw new Error(JSON.stringify({
                                status: 400,
                                message: 'Invalid image parameters.'
                            }));
                        }
                        this.imageId = imageId;
                        this.width = width || 0;
                        this.height = height || 0;
                        this.isOriginal = this.width <= 0 || this.height <= 0;
                        if (!this.isOriginal) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkIfOriginalImageExists()];
                    case 1:
                        originalImageExists = _c.sent();
                        if (!originalImageExists) {
                            //2.2 If the original image doesn't exist an error is emitted
                            throw new Error(JSON.stringify({
                                status: 404,
                                message: "Image " + this.imageId + " not found."
                            }));
                        }
                        return [3 /*break*/, 11];
                    case 2: return [4 /*yield*/, this.checkIfTransformedImageExists()];
                    case 3:
                        transformedImageExists = _c.sent();
                        if (!!transformedImageExists) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.checkIfOriginalImageExists()];
                    case 4:
                        originalImageExists = _c.sent();
                        if (!originalImageExists) return [3 /*break*/, 10];
                        //3.3 If the original image exists we can create the processed one from it.
                        //3.4 Create the processed folder based on width x height. e.g:, `images/processed/100x100/`
                        return [4 /*yield*/, fsAsync.mkdir(PROCESSED_IMAGES_PATH + "/" + this.width + "x" + this.height, { recursive: true })];
                    case 5:
                        //3.3 If the original image exists we can create the processed one from it.
                        //3.4 Create the processed folder based on width x height. e.g:, `images/processed/100x100/`
                        _c.sent();
                        return [4 /*yield*/, fsAsync.open(this.getImagePath(), 'w')];
                    case 6:
                        fileData = _c.sent();
                        _b = (_a = fileData).write;
                        return [4 /*yield*/, sharp(this.getStockImagePath()).resize(width, height).toBuffer()];
                    case 7: 
                    //3.6 Write image data to file
                    return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 8:
                        //3.6 Write image data to file
                        _c.sent();
                        //3.7 Close file data to clean up the memory
                        return [4 /*yield*/, fileData.close()];
                    case 9:
                        //3.7 Close file data to clean up the memory
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 10: 
                    //3.8 If the original image doesn't exist an error is emitted
                    throw new Error(JSON.stringify({
                        status: 404,
                        message: "Image " + this.imageId + " not found."
                    }));
                    case 11: return [2 /*return*/, this];
                }
            });
        });
    }
};
