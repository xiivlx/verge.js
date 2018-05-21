const app = require("express")();
const { stream, users, channels, console_helper } = require("./source/utilities/utils");

stream.add_stream("main");

//channels.add_channel("#osu",        "default osu channel");
//channels.add_channel("#verge",      "main osu!verge channel");
//channels.add_channel("#announce",   "announcements channel", false, true);
//channels.add_channel("#admin",      "admin only channel", true, false);
//channels.add_channel("#std",        "osu!standard channel");
//channels.add_channel("#catch",      "osu!catch channel");
//channels.add_channel("#mania",      "osu!mania channel");
//channels.add_channel("#taiko",      "osu!taiko channel");

users.add_user(new users.user(config.server.bot_name, 1));
stream.add_user("main", users.get(config.server.bot_name));

app.post("/", require("./handlers/main"));
app.listen(config.server.port);

console_helper.print_metadata();c