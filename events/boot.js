var figlet = require('figlet');
const client = require("../index");

client.on("ready", () =>
    console.log('Welcome to Open Radio Bot!\n This bot is from the OnlyTunes repo found here: https://github.com/OnlyTunes/Radio-Bot \n We hope you enjoy using this bot! \n Let us know of any issues VIA either our discord server or the issues section on the REPO!'),
    figlet('ONLYTUNES.UK', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    })
);
