var osuPacket = require("osu-packet");
const token = require("../utilities/token");
var login_handler = require("./login");

const handle = (req, res) => {
    const writer = new osuPacket.Bancho.Writer(req.packet);
    const reader = new osuPacket.Client.Reader(req.packet);
    console.log("lele");

    const packet_data = reader.Parse();
    for (let i = 0; i < packet_data.length; i++) {
        let packet = packet_data[i];
        console.log(packet);
        switch (packet.id) {
            case 1:
            console.log(packet.data);
            writer.SendMessage({
                sendingClient: 'your mom gay',
                message: 'hey man you are awesome guy man your message is: ' + packet.data.message,
                target: packet.data.target,
                senderId: 1
            });
            token.broadcast_to_token(req.header("osu-token"), writer.toBuffer);
            break;
        }
    }
};

function mainHandler(req, res) {
    req.packet = new Buffer("");

    req.on("data", chunk => req.packet = Buffer.concat([req.packet, chunk], req.packet.length + chunk.length));
    req.on("end", () => {
        if (req.header("user-agent") === "osu!") {
            if (req.header("osu-token") === undefined) {
                login_handler(req, res);
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
}



module.exports = mainHandler;