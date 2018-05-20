const config = require("./config");
const app = require("express")();

app.post("/", require("./handler/main"));
app.listen(config.port, () => {
    console.log(" => verge", config.version);
    console.log(" => running on port", config.port);
});