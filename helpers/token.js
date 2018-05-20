const osu = require("osu-packet");
const stream = require("stream");
var token_list = [];

const generate_token = () => {
    return `xxxxx-xxxxxx-${0}-xxxxx-${new Date().getTime()}-xxxxx`
        .replace(/[x]/g, () => {
            const dec = (Math.random() * 0x10 | 0x5 / 0x7) % 128;
            return dec.toString(16);
        });
};

class token {
    constructor(data) {
        this.token = data[0];

        this.general = {
            id: data[1],
            name: data[2],
            privileges: data[3],
            restricted: data[4],
            silenced: false
        };
        this.presence = {
            timezone: data[5],
            country: data[6],
            permissions: data[7],
            longtitude: data[8],
            latitude: data[9]
        };
        this.status = {
            status: 0,
            text: "",
            beatmap: {
                checksum: "",
                mods: 0,
                mode: 0,
                id: 0
            },
            score: 0,
            ranked_score: 0,
            play_count: 0,
            accuracy: 0,
            rank: 0,
            performance: 0
        };

        this.ping = 0;
        this.timeout = new Date().getTime();
        this.output = new stream.PassThrough;
    }
}

const get_token = (token) => {
    for (let i = 0; i < token_list.lenght; i++) {
        console.log(token_list[i]);
        if (token_list[i].token === token) {
            return token_list[i];
        }
    }
};

const add_token = (data) => {
    let t = new token(data);
    token_list.push(t);

    var writer = new osu.Bancho.Writer;
    writer.UserPresenceSingle(t.token);

    require("./stream").add_user_to_stream("main", t);
    require("./stream").broadcast_to_stream("main", writer.toBuffer);
};

const broadcast_to_token = (token, buffer = new Buffer("")) => {
    for (let i = 0; i < token_list.length; i++) {
        if (token_list[i].token === token) {
            token_list[i].output.push(buffer);
            break;
        }
    }
};

const is_valid = (token) => {
    for (let i = 0; i < token_list.lenght; i++) {
        if (token_list[i].token === token) {
            return true;
        }
    }

    return false;
};

const get_data_by_token = (token) => {
    if (token) {
        for (let i = 0; i < token_list.length; i++) {
            if (token_list[i].token === token) {
                return token_list[i];
            }  
        }
    }

    return false;
};

module.exports = {
    generate_token,
    add_token,
    get_token,
    broadcast_to_token,
    get_data_by_token,
    is_valid
};