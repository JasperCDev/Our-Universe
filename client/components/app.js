"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
var styles_1 = require("./styles");
var userForm_1 = __importDefault(require("./userForm"));
var topTenUsers_1 = __importDefault(require("./topTenUsers"));
var App = function () {
    var _a = react_1.useState(0), global_clicks = _a[0], set_global_clicks = _a[1];
    var _b = react_1.useState(''), user_name = _b[0], set_user_name = _b[1];
    var _c = react_1.useState(0), user_clicks = _c[0], set_user_clicks = _c[1];
    var _d = react_1.useState(false), form_submitted = _d[0], set_form_submitted = _d[1];
    var _e = react_1.useState(true), login = _e[0], set_login = _e[1];
    var _f = react_1.useState([]), top_ten_users = _f[0], set_top_ten_users = _f[1];
    var _g = react_1.useState(0), session_clicks = _g[0], set_session_clicks = _g[1];
    var user_name_ref = react_1.useRef('');
    user_name_ref.current = user_name;
    var session_clicks_ref = react_1.useRef(0);
    session_clicks_ref.current = session_clicks;
    react_1.useEffect(function () {
        getGlobalClicks();
        getTopTenUsers();
        setInterval(function () { return clicksLifeCycle(); }, 5000);
    }, []);
    var clicksLifeCycle = function () {
        updateGlobalClicks()
            .then(getGlobalClicks)
            .then(updateUserClicks)
            .then(getTopTenUsers);
    };
    var getGlobalClicks = function () {
        return axios_1.default.get('/global_clicks')
            .then(function (response) {
            set_global_clicks(response.data.rows[0].click_count);
        })
            .catch(function (err) { return console.error(err); });
    };
    var updateGlobalClicks = function () {
        // if (!session_clicks) return new Promise(() => {});
        return axios_1.default.put('/global_clicks', {
            clicks: session_clicks_ref.current
        })
            .catch(function (err) { return console.error(err); });
    };
    var registerUser = function (user_name) {
        return axios_1.default.post('/user', { user_name: user_name })
            .then(function (response) {
            if (response.data === 'User already exists') {
                alert(response.data);
            }
            else {
                set_user_name(response.data.user_name);
                set_form_submitted(true);
                getTopTenUsers();
            }
        })
            .catch(function (err) { return console.error(err); });
    };
    var logInUser = function (user_name) {
        return axios_1.default.get("/user?u=" + user_name)
            .then(function (response) {
            if (response.data === 'That user does not exist') {
                alert(response.data);
            }
            else {
                set_user_name(response.data.user_name);
                set_user_clicks(response.data.user_clicks);
                set_form_submitted(true);
            }
        })
            .catch(function (err) { return console.error(err); });
    };
    var updateUserClicks = function () {
        //if (!session_clicks) return new Promise(() => {});
        return axios_1.default.put('/user', {
            user_name: user_name_ref.current,
            clicks: session_clicks_ref.current,
        })
            .then(function (response) { return set_session_clicks(0); })
            .catch(function (err) { return console.error(err); });
    };
    var getTopTenUsers = function () {
        return axios_1.default.get('/users')
            .then(function (response) { return set_top_ten_users(response.data); })
            .catch(function (err) { return console.error(err); });
    };
    var userFormSubmitHandler = function (e) {
        e.preventDefault();
        if (login) {
            logInUser(e.target[0].value);
        }
        else {
            registerUser(e.target[0].value);
        }
    };
    var buttonClickHandler = function () {
        set_global_clicks(global_clicks + 1);
        set_session_clicks(session_clicks + 1);
        set_user_clicks(user_clicks + 1);
    };
    var toggleLogin = function () { return set_login(!login); };
    if (!form_submitted) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(styles_1.Div, null,
                react_1.default.createElement(styles_1.GlobalStyle, null),
                react_1.default.createElement(userForm_1.default, { submitHandler: userFormSubmitHandler, toggleLogin: toggleLogin, login: login }))));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(styles_1.Div, null,
            react_1.default.createElement(styles_1.GlobalStyle, null),
            react_1.default.createElement(styles_1.Greeting, null, "Hello, " + user_name),
            react_1.default.createElement(styles_1.Counter, null, global_clicks),
            react_1.default.createElement("h3", null,
                react_1.default.createElement("b", null, user_name + ": " + user_clicks)),
            react_1.default.createElement(styles_1.Button, { onClick: buttonClickHandler }, "Click Me!")),
        react_1.default.createElement(topTenUsers_1.default, { users: top_ten_users })));
};
exports.default = App;
