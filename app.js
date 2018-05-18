const express = require("express");
const app = express();
const version = "0.01-beta"

console.log("Verge.js v" + version);

app.post("/", require("./handler/main"));
app.listen(80);
