const osu = require("osu-packet");
const config = require("../config");

const token = require("../helpers/token");
const stream = require("../helpers/stream");
const login_handler = require("./login");

const handle = (req, res) => {
    const writer = new osu.Bancho.Writer(req.packet);
    const reader = new osu.Client.Reader(req.packet);

    const packet_data = reader.Parse();

    for (let i = 0; i < packet_data.length; i++) {
        let packet = packet_data[i];

        switch (packet.id) {
            case 1:
                writer.SendMessage({
                    sendingClient: config.bancho.bot_name,
                    message: "your message: " + packet.data.message,
                    target: packet.data.target,
                    senderId: 1
                });
                stream.broadcast_to_stream("main", writer.toBuffer, { token: req.header("osu-token") });
                break;
            case 85:
                const writeraaa = new osu.Bancho.Writer;

                let UserIDs = [];
                let output = new Buffer('');

                for (let i = 0, len = token.tokens.length; i < len; i++) {
                    UserIDs.push(token.tokens[i].general.id);
                }
                writeraaa.UserPresenceBundle(UserIDs);
                token.broadcast_to_token(req.header("osu-token"), writeraaa.toBuffer);

                let obj = {
                    userId: login_handler.id,
                    username: user_data.username,
                    timezone: 0,
                    countryId: 54,
                    permissions: 4,
                    longitude: 0,
                    latitude: 0,
                    rank: Math.floor(Math.random() * 100) + 1
                };
                writer.UserPresence(obj);

                break;
        }

        token.broadcast_to_token(req.header("osu-token"), writer.toBuffer);
    }
};

const main_handler = (req, res) => {
    req.packet = new Buffer("");

    req.on("data", chunk => req.packet = Buffer.concat([req.packet, chunk], req.packet.length + chunk.length));
    req.on("end", () => {
        if (req.header("user-agent") === "osu!") {
            if (req.header("osu-token") === undefined) {
                login_handler.handle(req, res);
            } else {
                handle(req, res);

                res.writeHead(200, {
                    "cho-protocol": 19,
                    "Connection": "keep-alive",
                    "Keep-Alive": "timeout=5, max=100",
                    "Content-Type": "text/html; charset=UTF-8"
                });

                const token_data = token.get_data_by_token(req.header("osu-token"));
                if (token_data) {
                    let stream = token_data.output.read();
                    if (stream == null) {
                        stream = new Buffer("");
                    }

                    res.end(stream);
                }
            }
        } else {
            // reject
        }
    });
};

module.exports = main_handler;