const middleware = require("./middleware");
const express = require("express");

const server = express();
middleware(server);


module.exports = server; 