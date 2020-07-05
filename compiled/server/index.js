"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
require("../database/index");
const controllers_1 = require("../database/controllers");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression"));
app.use(compression_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
app.use(body_parser_1.default.json());
app.get('/global_clicks', (req, res) => {
    controllers_1.getGlobalClicks(req, res);
});
app.put('/global_clicks', (req, res) => {
    controllers_1.updateGlobalClicks(req, res);
});
app.get('/user', (req, res) => {
    controllers_1.getUser(req, res);
});
app.post('/user', (req, res) => {
    controllers_1.createUser(req, res);
});
app.put('/user', (req, res) => {
    controllers_1.updateUserClicks(req, res);
});
app.get('/users', (req, res) => {
    controllers_1.getTopTenUsers(req, res);
});
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
