"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("./styles");
var TopTenUsers = function (_a) {
    var users = _a.users;
    return (react_1.default.createElement(styles_1.TopTenUsersDiv, null,
        react_1.default.createElement("h3", null, "Top Ten Players:"),
        users.map(function (user, index) { return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(styles_1.TopUser, null, index + 1 + ") " + user.user_name + ": " + user.user_clicks),
            users[index + 1] ? react_1.default.createElement("hr", null) : react_1.default.createElement(react_1.default.Fragment, null))); })));
};
exports.default = TopTenUsers;
