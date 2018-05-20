const app = require("express")();
const packet = require("osu-packet");
const consoleHelper= reuqire("./helpers/consoleHelper")

consoleHelper.printServerStart();

app.post("/");
app.listen(config.port, () => {
    console.log(" => verge", config.version);
    console.log(" => running on port", config.port);
});