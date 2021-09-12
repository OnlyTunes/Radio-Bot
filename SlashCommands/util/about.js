const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");

module.exports = {
    name: "about",
    description: "Helps explain the bot!",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client,interaction, args) => {
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

        const Github = `https://github.com/OnlyTunes/Radio-Bot`

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Github')
                    .setStyle('LINK')
                    .setURL(Github),
            );
        
        const embed = new MessageEmbed()
            .setColor('#E91E63')
            .setTitle('About Me')
            .setURL(Github)
            .setDescription('Im an easy to use open source Discord Radio bot. You can check me out using the button below!')
            .setFooter(
                `Requested by ${interaction.user.tag}`,
                interaction.user.displayAvatarURL({
                    dynamic: true,
                })
            );

        await interaction.followUp({ ephemeral: true, embeds: [embed], components: [row] });
            
    }
}