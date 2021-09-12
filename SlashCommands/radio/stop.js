const { createAudioResource, createAudioPlayer, joinVoiceChannel, AudioPlayerStatus, } = require('@discordjs/voice');
const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stops playback and will leave current VC!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {

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

        const voiceChannel = interaction.member.voice.channel;
        const NoVCEmbed = new MessageEmbed().
            setColor('BLUE').
            setTitle('I am unable to Leave VC').
            setFields(
                { name: 'Unable to leave VC', value: `I was unable to leave VC. Please check that you are in a VC that i can see!`, inline: true }
            ).
            setTimestamp().
            setFooter(
                `Requested by ${interaction.user.tag}`,
                interaction.user.displayAvatarURL({
                    dynamic: true,
                })
            )

        if (!voiceChannel)
        
            return interaction.followUp({ embeds: [NoVCEmbed] });
        

        let connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })

        connection.destroy()
        
        const leaveEmbed = new MessageEmbed().
            setColor('BLUE').
            setTitle('Now Leaving VC!').
            setFields(
                { name: 'Thanks for listening!', value: `We cant wait to join you in VC again soon!`, inline: true}
            ).
            setTimestamp().
            setFooter(
                `Requested by ${interaction.user.tag}`,
                interaction.user.displayAvatarURL({
                    dynamic: true,
                })
            )

        interaction.followUp({ embeds: [leaveEmbed] });
           
    }
}