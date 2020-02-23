

module.exports = {
  start: function (listener) {
    
    const Discord = require('discord.js');
    const client = new Discord.Client();
    var auth = require('./auth.json');
    
    client.on('ready', msg => {
      voiceChannel = client.channels.get("680915973360058414") // 680916063311102207
        voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          
          const receiver = listener.createReceiver();      

          receiver.on('opus', (user, speak) => {
            console.log(user);
            connection.playOpusStream(speak);
          });
        })
        .catch(console.log);
    });
    
    client.login(auth["token"]);

    return client;
  }
};