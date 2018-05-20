const app = require("express")();
const packet = require("osu-packet");
const consoleHelper= require("./helpers/consoleHelper")
const config= require("./config")

consoleHelper.printServerStart();

app.post("/");
app.listen(config.port, () => {
    console.log("> running on port", config.port + " <");
});