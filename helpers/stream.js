const token = require("./token");
let streams = [];

class stream {
    constructor(data) {
        this.name = data[0];
        this.users = [];
    }
}

const get_stream_by_name = (name) => {
    for (let i = 0; i < streams.length; i++) {
        if (streams[i].name === name) {
            return streams[i];
        }
    }

    return undefined;
};

const add_stream = (name) => {
    if (get_stream_by_name(name) === undefined) {
        streams.push(new stream([name]));
    }
};

const remove_stream = (name) => {
    for (let i = 0; i < streams.length; i++) {
        if (streams[i].name === name) {
            streams.splice(i, 1);
            break;
        }
    }
};

const add_user_to_stream = (name, user) => {
    let stream = get_stream_by_name(name);

    if (stream != undefined) {
        stream.users.push(user);
    }
};

const remove_user_from_stream = (name, user) => {
    let stream = get_stream_by_name(name);

    if (stream != undefined) {
        for (let i = 0; i < stream.users.length; i++) {
            if (stream.users.token === user.token) {
                stream.users.splice(i, 1);
                break;
            }
        }
    }
};

const broadcast_to_stream = (name, buffer = new Buffer(""), user) => {
    let stream = get_stream_by_name(name);

    if (stream != undefined) {
        for (let i = 0; i < stream.users.length; i++) {
            if (user) {
                if (stream.users[i].token === user.token) {
                    continue;
                } else {
                    token.broadcast_to_token(stream.users[i].token, buffer);
                }
            } else {
                token.broadcast_to_token(stream.users[i].token, buffer);
            }
        }
    }
};

module.exports = {
    add_stream,
    remove_stream,
    add_user_to_stream,
    remove_user_from_stream,
    broadcast_to_stream,
    get_stream_by_name
};