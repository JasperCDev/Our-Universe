"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
require("../database/index");
var controllers_1 = require("../database/controllers");
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var compression_1 = __importDefault(require("compression"));
app.use(compression_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
app.use(body_parser_1.default.json());
app.get('/global_clicks', function (req, res) {
    controllers_1.getGlobalClicks(req, res);
});
app.put('/global_clicks', function (req, res) {
    controllers_1.updateGlobalClicks(req, res);
});
app.get('/user', function (req, res) {
    controllers_1.getUser(req, res);
});
app.post('/user', function (req, res) {
    controllers_1.createUser(req, res);
});
app.put('/user', function (req, res) {
    controllers_1.updateUserClicks(req, res);
});
app.get('/users', function (req, res) {
    controllers_1.getTopTenUsers(req, res);
});
app.listen(PORT, function () { return console.log("Listening on PORT " + PORT); });
