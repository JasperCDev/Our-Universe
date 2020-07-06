"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("./styles");
var UserForm = function (_a) {
    var submitHandler = _a.submitHandler, toggleLogin = _a.toggleLogin, login = _a.login;
    return (react_1.default.createElement(react_1.default.Fragment, null, login ?
        react_1.default.createElement(styles_1.FormDiv, null,
            react_1.default.createElement("h2", null, "Log in!"),
            react_1.default.createElement("form", { onSubmit: submitHandler },
                react_1.default.createElement("label", null,
                    "Username:",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("input", { type: "text", placeholder: "username", required: true })),
                react_1.default.createElement("br", null),
                react_1.default.createElement("button", { type: "submit" }, "Submit")),
            react_1.default.createElement("p", null, "Don't have an account?"),
            react_1.default.createElement("a", { onClick: toggleLogin }, "Click here"))
        :
            react_1.default.createElement(styles_1.FormDiv, null,
                react_1.default.createElement("h2", null, "Sign Up!"),
                react_1.default.createElement("form", { onSubmit: submitHandler },
                    react_1.default.createElement("label", null,
                        "Username:",
                        react_1.default.createElement("br", null),
                        react_1.default.createElement("input", { type: "text", placeholder: "ex: BeastSlayer64..." })),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("button", { type: "submit" }, "Submit")),
                react_1.default.createElement("p", { onClick: toggleLogin }, "Already have an account?"),
                react_1.default.createElement("a", { onClick: toggleLogin }, "Click here"))));
};
exports.default = UserForm;
