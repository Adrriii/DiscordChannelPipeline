

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

          let mixer = new AudioMixer.Mixer({
            channels: 2,
            bitDepth: 16,
            sampleRate: 48000,
            clearInterval: 250
          });

          streams = {}

          listener.on('speaking', (user, speak) => {
            if (!user) return;
            if(user.id == "680938963598704650") return;
            console.log(user.username + " is speaking.  ");

            if (user.id in streams) {
              streams[user.id].destroy();
            }
            
            const audio = listener.receiver.createStream(user, { mode:"pcm" ,end: 'silence'});
            let input = mixer.input({
                channels: 2,
                volume: 100,
            });

            audio.pipe(input);

            streams[user.id] = audio;
          });
          
          speaker.play(mixer, { type: 'converted' });
          
        })
        .catch(console.log);
    });
    
    client.login(auth["token"]);

    return client;
  }
};