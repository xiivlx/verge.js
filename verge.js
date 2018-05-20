const app = require("express")();
const console_helper = require("./helpers/console");
const config = require("./config");

console_helper.print_metadata();

app.post("/", require("./handlers/main"));
app.listen(config.server.port);