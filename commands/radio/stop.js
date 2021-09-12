const { Message, Client, VoiceConnection, Channel, MessageEmbed } = require("discord.js");
const {
	NoSubscriberBehavior,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	entersState,
	AudioPlayerStatus,
	VoiceConnectionStatus,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = {
    name: "stop",
    description: "Stops playback and will leave current VC!",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
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
        
        async function LeaveVC(channel) {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            try {
                await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
                return connection;
            } catch (error) {
                connection.destroy();
                throw error;
            }

        }

        const channel = message.member?.voice.channel;

        if (channel) {
            try {
                const connection = await LeaveVC(channel);
                connection.disconnect();
                connection.destroy();
                
                const leaveEmbed = new MessageEmbed().
                    setColor('BLUE').
                    setTitle('Now Leaving VC!').
                    setFields(
                        { name: 'Thanks for listening', value: `We cant wait to join you in VC again soon!`, inline: true}
                    ).
                    setTimestamp().
                    setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({
                            dynamic: true,
                        })
                    )

                message.channel.send({ embeds: [leaveEmbed] });
                    } catch (e) {
                        console.log(e)
                    }

        } else {
            
            const NoVCEmbed = new MessageEmbed().
            setColor('BLUE').
            setTitle('I am unable to Leave VC').
            setFields(
                { name: 'Unable to leave VC', value: `I was unable to leave VC. Please check that you are in a VC that i can see!`, inline: true }
            ).
            setTimestamp().
            setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({
                    dynamic: true,
                })
            )

            message.reply({ embeds: [NoVCEmbed] });
            
        }

    },
};
