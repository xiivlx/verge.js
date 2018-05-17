const express = require("express");
const app = express();

app.post("/", require("./handler/main"));
app.listen(80, () => console.log("le very basic osu bancho v0.0.0.1 autism edition"));