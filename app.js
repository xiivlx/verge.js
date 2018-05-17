const express = require("express");
const app = express();
const version = "0.01-beta"

app.post("/", require("./handler/main"));
app.listen(80, () => console.log("levbob v" + version));