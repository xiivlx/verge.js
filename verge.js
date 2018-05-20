const app = require("express")();
const console_helper = require("./helpers/console");
const config = require("./config");
const stream = require("./helpers/stream");

stream.add_stream("main");

console_helper.print_metadata();

app.post("/", require("./handlers/main"));
app.listen(config.server.port);