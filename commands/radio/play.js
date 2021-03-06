const { Message, Client, VoiceConnection, Channel, MessageEmbed, GuildPreviewEmoji } = require("discord.js");
 
//env
require('dotenv').config({path:'../.env'});
const STREAMURL = process.env.STREAMURL

//requirements for VC
const {
	NoSubscriberBehavior,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	entersState,
	AudioPlayerStatus,
	VoiceConnectionStatus,
	joinVoiceChannel,
    getVoiceConnection,
} = require('@discordjs/voice');

module.exports = {
    name: "play",
    description: "Joins VC and starts playback",
    
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

        try {
            global.connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                selfDeaf: true,
                selfMute: false,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
        } catch (e) {
            console.log(e);
            
                const NoVCEmbed = new MessageEmbed().
                    setColor('BLUE').
                    setTitle('I am unable to Join VC').
                    setFields(
                        { name: 'Unable to Join VC', value: `I was unable to join VC. Please check that you are in a VC that i can see!`, inline: true }
                    ).
                    setTimestamp().
                    setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({
                            dynamic: true,
                        })
                    )
                return message.reply({ embeds: [NoVCEmbed] });
                    
            }

            try {
                const connection = getVoiceConnection(message.guild.id);
                player = createAudioPlayer();
                dispatcher = connection.subscribe(player);
                const resource = createAudioResource(STREAMURL);
                            const vcEmbed = new MessageEmbed().
                                setColor('BLUE').
                                setTitle('Joining your VC!').
                                setFields(
                                    { name: 'Now joining!', value: `please wait while playback starts!`, inline: true }
                                ).
                                setTimestamp().
                                setFooter(
                                    `Requested by ${message.author.tag}`,
                                    message.author.displayAvatarURL({
                                        dynamic: true,
                                    })
                                )
                            message.reply({ embeds: [vcEmbed] });

                await sleep(5000)
                player.play(resource);
                player.on(AudioPlayerStatus.Idle, async () => {
                  const newResource = createAudioResource(STREAMURL);
                  await sleep(5000)
                  player.play(newResource);
                });
                


            } catch (e) {

                    console.log(e);

                    const StreamEembed = new MessageEmbed().
                        setColor('RED').
                        setTitle('I seem to have had an error').
                        setFields(
                            { name: 'Stream Error', value: `An error occoured while loading the stream. Please try again`, inline: true }
                        ).
                        setTimestamp()

                    message.channel.send({ embeds: StreamEembed });
                        
            }
            
    },
};


global.sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};