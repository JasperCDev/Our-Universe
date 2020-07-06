"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopUser = exports.TopTenUsersDiv = exports.FormDiv = exports.ScrollUpForm = exports.Button = exports.Greeting = exports.Counter = exports.Div = exports.GlobalStyle = void 0;
var styled_components_1 = __importStar(require("styled-components"));
exports.GlobalStyle = styled_components_1.createGlobalStyle(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  body {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    font-family: sans-serif;\n    background-color: light grey;\n  }\n\n  #app {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n  }\n"], ["\n  body {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    font-family: sans-serif;\n    background-color: light grey;\n  }\n\n  #app {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n  }\n"])));
exports.Div = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 1000px;\n  height: 1000px;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: relative;\n"], ["\n  display: flex;\n  width: 1000px;\n  height: 1000px;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: relative;\n"])));
exports.Counter = styled_components_1.default.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 7em;\n  color: red;\n  margin: 0;\n"], ["\n  font-size: 7em;\n  color: red;\n  margin: 0;\n"])));
exports.Greeting = styled_components_1.default.h2(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 2.5em;\n  color: teal;\n  font-family: helvetica;\n  margin-top: 0;\n"], ["\n  font-size: 2.5em;\n  color: teal;\n  font-family: helvetica;\n  margin-top: 0;\n"])));
exports.Button = styled_components_1.default.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 1.7em;\n  height: 6em;\n  width: 10em;\n  border-radius: 60%;\n  cursor: pointer;\n  border: 2px solid black;\n  :focus {\n    outline:0;\n  }\n  :active {\n    border-style: outset;\n    background-color: lightblue;\n  }\n"], ["\n  font-size: 1.7em;\n  height: 6em;\n  width: 10em;\n  border-radius: 60%;\n  cursor: pointer;\n  border: 2px solid black;\n  :focus {\n    outline:0;\n  }\n  :active {\n    border-style: outset;\n    background-color: lightblue;\n  }\n"])));
exports.ScrollUpForm = styled_components_1.keyframes(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  0% { background-color: lightgrey; }\n  100% { background-color: black; }\n"], ["\n  0% { background-color: lightgrey; }\n  100% { background-color: black; }\n"])));
exports.FormDiv = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  border: 2px solid darkgrey;\n  height: 150%;\n  width: 150%;\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  background-color: lightgrey;\n  border-radius: 1%;\n  animation-name: ", ";\n  animation-duration: 10s;\n"], ["\n  border: 2px solid darkgrey;\n  height: 150%;\n  width: 150%;\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  background-color: lightgrey;\n  border-radius: 1%;\n  animation-name: ", ";\n  animation-duration: 10s;\n"])), exports.ScrollUpForm);
exports.TopTenUsersDiv = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  border: 1px solid black;\n  border-radius: 3%;\n  width: 15em;\n"], ["\n  border: 1px solid black;\n  border-radius: 3%;\n  width: 15em;\n"])));
exports.TopUser = styled_components_1.default.p(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  padding-left: 1em;\n  font-size: 1.2em;\n"], ["\n  padding-left: 1em;\n  font-size: 1.2em;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
