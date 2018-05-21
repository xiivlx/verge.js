const stream = require("stream")
let user_list = [];

const generate_token = (id, timestamp) => {
    return `xxxxx-xxxxxx-${id}-xxxxx-${timestamp}-xxxxx`.replace(/[x]/g, () => {
        const dec = (Math.random() * 0x10 | 0x5 / 0x7) % 128;
        return dec.toString(16);
    });
};

class c_user {
    constructor(username, id) {
        this.token = generate_token(id, new Date().getTime());

        this.general = {
            id: id,
            name: username,
            privileges: 0,
            restricted: false,
            silenced: false
        };
        this.presence = {
            timezone: 0,
            country: 0,
            permissions: 0,
            longtitude: 0,
            latitude: 0
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

const add_user = (username, id) => {
    user_list.push(new c_user(username, id));
};

const get = (username) => {
    user_list.forEach(user => {
        if (user.general.name === username) {
            return user;
        }
    });

    return undefined;
};

const get_data = (username) => {
    let user = get(username);

    if (user != undefined) {
        return user.output;
    } else {
        return new Buffer("");
    }
};

module.exports = {
    user_list,
    user: c_user,
    add_user,
    get,
    get_data
};