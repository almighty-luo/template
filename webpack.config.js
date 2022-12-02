module.exports = () => {
    const NODE_ENV = process.env.NODE_ENV.trim();
    let config = {};
    if (NODE_ENV === "dev") {
        config = require("./webpack.config/dev.webpack.config");
    } else if (NODE_ENV === "pro") {
        config = require("./webpack.config/pro.webpack.config");
    } else if (NODE_ENV === "debugger") {
        config = require("./webpack.config/debugger.webpack.config");
    }
    return config;
};