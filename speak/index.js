

module.exports = {
  start: function (listener) {

    var AudioMixer = require('audio-mixer');
    var fs = require('fs');
    var ffmpeg = require('fluent-ffmpeg')
    
    const Discord = require('discord.js');
    const client = new Discord.Client();
    var auth = require('./auth.json');
    
    client.on('ready', msg => {
      voiceChannel = client.channels.cache.get("680916063311102207") // 
        voiceChannel.join()
        .then(speaker => {          
          console.log('ready');

          listener.on('speaking', (user, speak) => {
            if (!user) return;
            if(user.id == "680938963598704650") return;
            console.log(user.username + " is speaking.  ");

            const audio = listener.receiver.createStream(user, { end: 'silence'});
            speaker.play(audio, { type: 'opus' });
          });
          
        })
        .catch(console.log);
    });
    
    client.login(auth["token"]);

    return client;
  }
};