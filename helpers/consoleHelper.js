const version = require("../version")

function printServerStart() {
    // This prints the Verge ascii art that you see upon starting the bancho.
    console.log(" ___      ___ _______   ________  ________  _______      ");
    console.log("|\\  \\    /  /|\\  ___ \\ |\\   __  \\|\\   ____\\|\\  ___ \\     ");
    console.log("\\ \\  \\  /  / | \\   __/|\\ \\  \\|\\  \\ \\  \\___|\\ \\   __/|    ");
    console.log(" \\ \\  \\/  / / \\ \\  \\_|/_\\ \\   _  _\\ \\  \\  __\\ \\  \\_|/__  ");
    console.log("  \\ \\    / /   \\ \\  \\_|\\ \\ \\  \\\\  \\\\ \\  \\|\\  \\ \\  \\_|\\ \\ ");
    console.log("   \\ \\__/ /     \\ \\_______\\ \\__\\\\ _\\\\ \\_______\\ \\_______\\ ");
    console.log("    \\|__|/       \\|_______|\\|__|\\|__|\\|_______|\\|_______|");
    console.log("> Welcome to the Verge osu!bancho server v" + version + "<");
    console.log("> Made by czapek and ilyt <");
    console.log("> https://github.com/ilyt/verge.js <")
    console.log("> Press CTRL+C to exit <")
}

module.exports = {
    printServerStart
};