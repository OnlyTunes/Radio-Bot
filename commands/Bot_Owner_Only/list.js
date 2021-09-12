const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
require('dotenv').config({path:'./.env'});
const OwnerID = process.env.OWNERID;

module.exports = {
    name: 'list',
    description: 'Provides the owners with a list',

     run: async (client, message, args) => {
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

         let i0 = 0;
         let i1 = 10;
         let page = 1;
   
         let description;
      
         description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
           .map(r => r)
           .map((r, i) => `**${i + 1})** ${r.name}  \`(${r.memberCount} Members)\``)
             .slice(0, 10)
             .join("\n");
   
         let emb = new MessageEmbed()
       .setColor("GREEN")
       .setFooter(`Page ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
       .setDescription(description);
   
      let pages = new MessageActionRow().addComponents(
      new MessageButton()
     .setStyle("SECONDARY")
     .setEmoji("⬅️")
    .setCustomId("previous"),
      new MessageButton()
     .setStyle("SECONDARY")
     .setEmoji("➡️")
     .setCustomId("next")
      )
      
      let dis = new MessageActionRow().addComponents(
      new MessageButton()
     .setStyle("SECONDARY")
     .setEmoji("⬅️")
     .setDisabled(true)
    .setCustomId("previous"),
      new MessageButton()
     .setStyle("SECONDARY")
     .setEmoji("➡️")
     .setDisabled(true)
     .setCustomId("next")
      )  
         
     if(client.guilds.cache.size < 10) return message.channel.send({
         embeds: [emb],
         components: [dis]
     }) 
      
         let msg = await message.channel.send({
             embeds: [emb],
             components: [pages]
         });
    
       let filter = (i) => i.user.id === message.author.id;
   
         let collector = msg.createMessageComponentCollector({
       filter
         });
   
         collector.on("collect", async (i) => {
           if (i.customId === "previous") {
           i0 = i0 - 10;
           i1 = i1 - 10;
           page = page - 1;
           
       if (i1 < 9) return msg.delete();
   
       description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
           .map(r => r)
           .map((r, i) => `**${i + 1})** ${r.name} \`(${r.memberCount} Members)\``)
             .slice(i0, i1)
             .join("\n");
   
       emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 10)}`)
       .setDescription(description);
   
           msg.edit({
           embeds: [emb]
               
           });
           }
   
           if (i.customId === "next") {
   
             i0 = i0 + 10;
             i1 = i1 + 10;
             page = page + 1;
   
             if (i1 > client.guilds.cache.size + 10) return msg.delete();   
         if (!i0 || !i1) return msg.delete();
   
            description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
           .map(r => r)
           .map((r, i) => `**${i + 1})** ${r.name} \`( ${r.memberCount} Members)\``)
             .slice(i0, i1)
             .join("\n");
   
   
       emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 10)}`)
       .setDescription(description)      
       msg.edit({
           embeds: [emb]
       })
           }
         })
     }
   }