const process = require('process');
const os = require('os');
const prettyMilliseconds = require('pretty-ms');
const { Client, Message, MessageEmbed } = require('discord.js');
const BotVersion = require('../../package-lock.json').version;
require('dotenv').config({path:'./.env'});
const OwnerID = process.env.OWNERID;

module.exports = {
    name: 'debug',
    description: 'Give additionaly bot info for debugging',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message) => {
        if(message.author.id !== OwnerID) return;

        process.on('uncaughtException', (error, origin) => {
            console.log('----- Uncaught exception -----')
            console.log(error)
            console.log('----- Exception origin -----')
            console.log(origin)
        })
        
        process.on('unhandledRejection', (reason, promise) => {
            console.log('----- Unhandled Rejection at -----')
            console.log(promise)
            console.log('----- Reason -----')
            console.log(reason)
        })

        const WebSocketPing = client.ws.ping;
        const MessagePing = Date.now() - message.createdTimestamp;
        const MEMused = process.memoryUsage().heapUsed / 1024 / 1024;
        const BOTuptime = prettyMilliseconds(client.uptime);

        const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

                const InfoEmbed = new MessageEmbed()
                    .setColor(3447003)
                    .setTitle('DEBUG')
                    .setDescription('Stats for debuging the bot!')
                    .addFields(
                        { name: 'Servers: ', value: `\`\`\`\n${totalGuilds}\n\`\`\``, inline: true },
                        { name: 'Serving for: ', value: `\`\`\`\n${totalMembers}\n\`\`\``, inline: true },
                        { name: 'WebSocket: ', value: `\`\`\`\n${WebSocketPing <= 200 ? "🟢" : WebSocketPing <= 400 ? "🟡" : "🔴"} ${WebSocketPing}ms\n\`\`\``, inline: true },
                        { name: 'ping: ', value: `\`\`\`\n${MessagePing <= 200 ? "🟢" : MessagePing <= 400 ? "🟡" : "🔴"} ${MessagePing}ms\n\`\`\``, inline: true },
                        { name: 'OS: ', value: `\`\`\`\n${os.version}\n\`\`\``, inline: true },
                        { name: 'NodeJS Version: ', value: `\`\`\`\n${process.version}\n\`\`\``, inline: true },
                        { name: 'Bot Version: ', value: `\`\`\`\n${BotVersion}\n\`\`\``},
                        { name: 'Memory Usage: ', value: `\`\`\`\n${Math.round(MEMused * 100) / 100} MB\n\`\`\``, inline: true},
                        { name: 'Uptime: ', value: `\`\`\`\n${BOTuptime}\n\`\`\``, inline: true },
                    )
                    .setTimestamp()
                    .setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({
                            dynmic: true,
                        })
                    );

                    message.channel.send({ embeds: [InfoEmbed] });
            })
    }
}