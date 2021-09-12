const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");

module.exports = {
    name: "dev",
    description: "Provides links back to the Developer!",
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

        const GHprofile = `https://github.com/OnlyTunes`

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Developer Profile!')
                    .setStyle('LINK')
                    .setURL(GHprofile),
            );
        
        const embed = new MessageEmbed()
            .setColor('#E91E63')
            .setTitle('Developer!')
            .setURL(GHprofile)
            .setDescription('Hi, If you like this bot and would like to check out any more of my projects then check my profile out below! Many thanks Brayd ( braydford04#0001 on discord )')
            .setFooter(
                `Requested by ${interaction.user.tag}`,
                interaction.user.displayAvatarURL({
                    dynamic: true,
                })
            );

        await interaction.followUp({ ephemeral: true, embeds: [embed], components: [row] });
            
    }
}