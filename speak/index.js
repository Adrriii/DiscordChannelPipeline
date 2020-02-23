

module.exports = {
  start: function (input) {
    
    const Discord = require('discord.js');
    const client = new Discord.Client();
    var auth = require('./auth.json'); 
    
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
    
    client.on('message', msg => {
      // Voice only works in guilds, if the message does not come from a guild,
      // we ignore it
      if (!msg.guild) return;
    
      if (msg.content === 'entendre') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (msg.member.voiceChannel) {
          channel = 680916063311102207;
          msg.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
              
              connection.playStream(input);
            })
            .catch(console.log);
        } else {
          msg.reply('t pas en voc bro');
        }
      }
    });
    
    client.login(auth["token"]);

    return client;
  }
};