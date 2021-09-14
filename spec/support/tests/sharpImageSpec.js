"use strict";
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
var sharpImage_1 = require("../../../server/dist/helpers/sharpImage");
var fs = require("fs");
var index_1 = require("../../../server/dist/index");
var supertest = require('supertest');
var request = supertest(index_1["default"]);
var VALID_FILES = ['fjord.jpg', 'palmtunnel.jpg'];
var INVALID_FILES = ['test.jpg', 'xxx.jpg'];
var CUSTOM_HEIGHT = 90;
var CUSTOM_WIDTH = 100;
beforeAll(function (done) {
    fs.rmdir('images/processed/', { recursive: true }, function (err) {
        done();
    });
});
afterAll(function (done) {
    fs.rmdir('images/processed/', { recursive: true }, function (err) {
        done();
    });
});
describe('Helper Package Test', function () {
    it("Helper package's attributes should be available", function () {
        expect(sharpImage_1["default"].hasOwnProperty('imageId')).toBeTruthy();
        expect(sharpImage_1["default"].hasOwnProperty('height')).toBeTruthy();
        expect(sharpImage_1["default"].hasOwnProperty('isOriginal')).toBeTruthy();
    });
    it("Helper package's methods should be available", function () {
        expect(typeof sharpImage_1["default"].init).toEqual('function');
        expect(typeof sharpImage_1["default"].getStockImagePath).toEqual('function');
        expect(typeof sharpImage_1["default"].getImagePath).toEqual('function');
        expect(typeof sharpImage_1["default"].readImageStream).toEqual('function');
        expect(typeof sharpImage_1["default"].checkIfOriginalImageExists).toEqual('function');
        expect(typeof sharpImage_1["default"].checkIfTransformedImageExists).toEqual('function');
    });
});
describe('Image Processing Test', function () {
    var _this = this;
    it('Creating a new image using original properties', function () { return __awaiter(_this, void 0, void 0, function () {
        var sharpImageObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sharpImage_1["default"].init(VALID_FILES[0])];
                case 1:
                    sharpImageObject = _a.sent();
                    expect(sharpImageObject.imageId).toEqual(VALID_FILES[0]);
                    expect(sharpImageObject.width).toEqual(0);
                    expect(sharpImageObject.height).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Creating a new image using custom properties', function () { return __awaiter(_this, void 0, void 0, function () {
        var sharpImageObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(fs.existsSync("images/full/" + VALID_FILES[0])).toBeTruthy();
                    expect(fs.existsSync("images/processed/" + CUSTOM_WIDTH + "x" + CUSTOM_HEIGHT + "/" + VALID_FILES[0])).toBeFalsy();
                    return [4 /*yield*/, sharpImage_1["default"].init(VALID_FILES[0], CUSTOM_WIDTH, CUSTOM_HEIGHT)];
                case 1:
                    sharpImageObject = _a.sent();
                    expect(sharpImageObject.imageId).toEqual(VALID_FILES[0]);
                    expect(sharpImageObject.width).toEqual(CUSTOM_WIDTH);
                    expect(sharpImageObject.height).toEqual(CUSTOM_HEIGHT);
                    expect(sharpImageObject.isOriginal).toEqual(false);
                    expect(fs.existsSync("images/processed/" + CUSTOM_WIDTH + "x" + CUSTOM_HEIGHT + "/" + VALID_FILES[0])).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Default the image to the original one if sizing properties are invalid', function () { return __awaiter(_this, void 0, void 0, function () {
        var sharpImageObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sharpImage_1["default"].init(VALID_FILES[1], null, '')];
                case 1:
                    sharpImageObject = _a.sent();
                    expect(sharpImageObject.imageId).toEqual(VALID_FILES[1]);
                    expect(sharpImageObject.width).toEqual(0);
                    expect(sharpImageObject.height).toEqual(0);
                    expect(sharpImageObject.isOriginal).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Return the original/stock image path through the specialized method', function () { return __awaiter(_this, void 0, void 0, function () {
        var sharpImageObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sharpImage_1["default"].init(VALID_FILES[0], 100, 100)];
                case 1:
                    sharpImageObject = _a.sent();
                    expect(sharpImageObject.getStockImagePath()).toEqual("./images/full/" + VALID_FILES[0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Return the processed image path through the specialized method', function () { return __awaiter(_this, void 0, void 0, function () {
        var sharpImageObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sharpImage_1["default"].init(VALID_FILES[0], 100, 100)];
                case 1:
                    sharpImageObject = _a.sent();
                    expect(sharpImageObject.getImagePath()).toEqual("./images/processed/100x100/" + VALID_FILES[0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Offers the image as stream', function (done) {
        sharpImage_1["default"].init(VALID_FILES[0]).then(function (sharpImageObject) {
            sharpImageObject
                .readImageStream()
                .on('data', function () {
                return false;
            })
                .on('end', function () {
                done();
            });
        });
    });
    it("Throw an error if the original image doesn't exist", function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(fs.existsSync("images/full/" + INVALID_FILES[0])).toBeFalsy();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sharpImage_1["default"].init(INVALID_FILES[0])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    error = JSON.parse(e_1.message);
                    expect(error.status).toEqual(404);
                    expect(error.message).toEqual('Image test.jpg not found.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
describe('Endpoint Test', function () {
    var _this = this;
    it('Get "/test" endpoint with status=200 and body.message="pass test!"', function (doneFn) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/test')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.message).toBe('pass test!');
                    doneFn();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get "/api/image" endpoint using params of ?imageId=image.jpg & width=200 & height=200 with status=200"', function (doneFn) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/image?imageId=image.jpg&width=200&height=200')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    doneFn();
                    return [2 /*return*/];
            }
        });
    }); });
});
