let stream_list = [];

class c_stream {
    constructor(data) {
        this.name = data[0];
        this.users = [];
    }
}

const get = (name) => {
    stream_list.forEach(stream => {
        if (stream.name === name) {
            return stream;
        }
    });

    return undefined;
};

const add_stream = (name) => {
    if (get(name) === undefined) {
        stream_list.push(new c_stream([name]));
    }
};

const remove_stream = (name) => {
    let it = 0;

    stream_list.forEach(stream => {
        if (stream.name === name) {
            stream_list.slice(it, 1);
            return;
        }

        it++;
    });
};

const add_user = (name, user) => {
    let stream = get(name);

    if (stream != undefined) {
        stream.users.push(user);
    }
};

const remove_user = (name, user) => {
    let it = 0;
    let stream = get(name);

    if (stream != undefined) {
        stream.users.forEach(user => {
            if (user.general.name === user.general.name) {
                stream.users.slice(it, 1);
                return;
            }

            it++;
        });
    }
};

const broadcast = (name, buffer = new Buffer(""), ignore) => {
    let stream = get(name);

    if (stream != undefined) {
        stream.users.forEach(user => {
            if (user.token != ignore) {
                require("./token").broadcast(user.token, buffer);
            }
        });
    }
};

module.exports = {
    stream_list,
    stream: c_stream,
    get,
    add_stream,
    remove_stream,
    add_user,
    remove_user,
    broadcast
};