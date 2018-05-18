var osuPacket = require("osu-packet");

var joinChannel = {

    
    failed: function(req, res, reason) {
        var writer = new osuPacket.Bancho.Writer
        writer.joinChannel(-1);

        res.writeHead(200, {
            "cho-token": null,
            "cho-protocol": 19,
            "Connection": "keep-alive",
            "Keep-Alive": "timeout=5, max=100",
            "Content-Type": "text/html; charset=UTF-8"
        });
        res.end(writer.toBuffer);
    },
    success: function(req, res) {
        var writer = new osuPacket.Bancho.Writer

        writer.joinChannel(1);
        writer.ProtocolNegotiation(19);
        writer.joinChannel("#osu");

        res.writeHead(200, {
            "cho-token": "some-token",
            "cho-protocol": 19,
            "Connection": "keep-alive",
            "Keep-Alive": "timeout=5, max=100",
            "Content-Type": "text/html; charset=UTF-8"
        });
        res.end(writer.toBuffer);
    }
};
