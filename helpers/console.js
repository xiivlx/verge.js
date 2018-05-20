const asciify = require("asciify");

const print_metadata = async () => {
    asciify.getFonts((error, fonts) => {
        asciify("verge", { font: fonts[Math.round(Math.random() * fonts.length)] }, (error, result) => {
            console.log(result);
            console.log(" => welcome to verge.js", require("../version"));
            console.log(" => running on port", require("../config").server.port);
            console.log(" => made by czapek and ilyt");
            console.log(" => https://github.com/ilyt/verge.js")
            console.log(" => press ctrl+c to exit")
        });
    });
};

module.exports = {
    print_metadata
};