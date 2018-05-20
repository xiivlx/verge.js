const osu = require("osu-packet");
let xd = 0;

const stream = require("../helpers/stream");
const token = require("../helpers/token");

const parse_login_data = (data) => {
    const packet = data.toString();

    const credentials = packet.split("\n");
    const system_info = credentials[2].split("|");

    return {
        username: String(credentials[0]),
        password: String(credentials[1]),
        osu_version: String(system_info[0]),
        time_offset: Number(system_info[1]),
        client_data: system_info[3].split(":")[2]
    };
};

module.exports = {
    handle: (req, res) => {
        var writer = new osu.Bancho.Writer;

        const user_token = token.generate_token();
        const user_data = parse_login_data(req.packet);

        token.add_token([
            user_token, // user token
            1, // user id
            user_data.username, // username
            4, // privileges
            false, // restricted
            0, // timezome
            54, // country id
            4, // permissions 
            0, // longtitude
            0 // latitude
        ]);

        writer.LoginReply(1);
        writer.ProtocolNegotiation(19);
        writer.Announce("welcome to verge!");

        const listing = (t) => {
            let writa = new osu.Bancho.Writer;

            var channels = [
                {
                    name: "#osu",
                    description: "default chat channel",
                    user_count: 0
                },
                {
                    name: "#announce",
                    description: "channel for trashtalking kek",
                    user_count: 0
                },
                {
                    name: "#verge",
                    description: "main verge chat",
                    user_count: 0
                },
                {
                    name: "#nowranked",
                    description: "chat to announce ranked maps",
                    user_count: 0
                },
                {
                    name: "#polish",
                    description: "chat for czapek because he's a lonely pizdo", //r00d 
                    user_count: 1
                },
            ];

            writa.ChannelListingComplete();
            channels.forEach(channel => {
                writa.ChannelAvailable({
                    channelName: channel.name,
                    channelTopic: channel.description,
                    channelUserCount: channel.user_count
                });
            });

            token.broadcast_to_token(t, writa.toBuffer);
        };

        listing(user_token);

        writer.ChannelJoinSuccess("#verge");
        writer.ChannelJoinSuccess("#osu");
        writer.ChannelJoinSuccess("#announce");
        writer.ChannelJoinSuccess("#nowranked");
        writer.ChannelJoinSuccess("#polish");

        let obj = {
            userId: xd++,
            username: user_data.username,
            timezone: 0,
            countryId: 54,
            permissions: 4,
            longitude: 0,
            latitude: 0,
            rank: Math.floor(Math.random() * 100) + 1
        };
        writer.UserPresence(obj);

        res.writeHead(200, {
            "cho-token": user_token,
            "cho-protocol": 19,
            "Connection": "keep-alive",
            "Keep-Alive": "timeout=5, max=100",
            "Content-Type": "text/html; charset=UTF-8"
        });
        res.end(writer.toBuffer);
    },
    id: xd
};