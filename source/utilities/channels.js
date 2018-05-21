const osu = require("osu-packet");
const token = require("token");
const stream = require("stream")

let channel_list = [];

class channels {
    constructor(name, description, admin_only = false, read_only = false) {
        this.name = name;
        this.description = description;

        this.admin_only = admin_only;
        this.read_only = read_only;

        this.users = [];
    }
}

function channelJoin(token, name) {
    const writer = new osu.Bancho.Writer;

}

function channelLeave(token, name) {

}

function isPublic() {

}

function readOnly() {

}