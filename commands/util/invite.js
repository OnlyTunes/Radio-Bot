const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, Interaction } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Replies with an invite for the bot!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message) => {
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

        const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=242715315520&scope=bot%20applications.commands`

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Invite Me')
                    .setStyle('LINK')
                    .setURL(inviteURL),
            );
        
        const embed = new MessageEmbed()
            .setColor('#E91E63')
            .setTitle('Invite Me')
            .setURL(inviteURL)
            .setDescription('Use the button below to add the bot')
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({
                    dynamic: true,
                })
            );

        await message.channel.send({ ephemeral: true, embeds: [embed], components: [row] });
            
    }
}