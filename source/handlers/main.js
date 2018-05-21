const osu = require("osu-packet");
const config = require("../config");
const login_handler = require("./login");
const { stream, users, channels, console_helper } = require("../utilities/utils");

const main_handler = (req, res) => {
    req.packet = new Buffer("");

    req.on("data", chunk => req.packet = Buffer.concat([req.packet, chunk], req.packet.length + chunk.length));
    req.on("end", () => {
        if (req.header("user-agent") === "osu!") {
            if (req.header("osu-token") === undefined) {
                login_handler.handle(req, res);
            } else {
                res.writeHead(200, {
                    "cho-protocol": 19,
                    "Connection": "keep-alive",
                    "Keep-Alive": "timeout=5, max=100",
                    "Content-Type": "text/html; charset=UTF-8"
                });
                res.end(new Buffer(""));
            }
        } else {
            // reject
        }
    });
};

module.exports = main_handler;