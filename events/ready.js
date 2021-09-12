const client = require("../index");

client.on("ready", () =>
    console.log(`\n✅ ${client.user.tag} is up and ready to go!`)
);
