const osu = require("osu-packet");
const { stream, users, channels, console_helper } = require("./source/utilities/utils");

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

const handle = (req, res) => {
    var writer = new osu.Bancho.Writer;
    const user_data = parse_login_data(req.packet);

    users.add_user(user_data.username, 1);
    stream.add_user("main", users.get(user_data.username));

    writer.LoginReply(1);
    writer.ProtocolNegotiation(19);
    writer.Announce("welcome to verge!");

    writer.ChannelListingComplete();

    res.writeHead(200, {
        "cho-token": user_token,
        "cho-protocol": 19,
        "Connection": "keep-alive",
        "Keep-Alive": "timeout=5, max=100",
        "Content-Type": "text/html; charset=UTF-8"
    });
    res.end(writer.toBuffer);
};

module.exports = {
    handle
};