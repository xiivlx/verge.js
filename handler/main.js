var osuPacket = require("osu-packet");
var loginHandler = require("./login");

function mainHandler(req, res) {
    var data = Buffer("");

    req.on("data", chunk => data = Buffer.concat([data, chunk], data.length + chunk.length));
    req.on("end", () => {
        console.log(data.toString());
        
        if (req.header("user-agent") === "osu!") {
            if (req.header("osu-token") === undefined) {
                loginHandler.success(req, res);
            } else {
                res.end();
            }
        } else {
            loginHandler.failed(req, res, "tried to login outside of osu!");
        }
    });
}

module.exports = mainHandler;