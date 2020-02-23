

module.exports = {
  start: function (listener) {

    var AudioMixer = require('audio-mixer');
    var fs = require('fs');
    var ffmpeg = require('fluent-ffmpeg')
    
    const Discord = require('discord.js');
    const client = new Discord.Client();
    var auth = require('./auth.json');
    
    client.on('ready', msg => {
      voiceChannel = client.channels.get("680915973360058414") // 680916063311102207
        voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection

          let mixer = new AudioMixer.Mixer({
            channels: 2,
            bitDepth: 16,
            sampleRate: 16000,
            clearInterval: 250
          });
          
          const receiver = listener.createReceiver();
          
          console.log('ready');

          listener.on('speaking', (user, speak) => {
            if(user.id == "680938963598704650") return;
            console.log(user);
              
            let input = mixer.input({
              channels: 1,
              volume: 100
            });

            try {
              ffmpeg(receiver.createPCMStream(user))
              .inputFormat('s32le')
              .audioFrequency(48000)
              .audioChannels(1)
              .audioCodec('pcm_s16le')
              .format('s16le')
              .on('error', console.log)
              .pipe(input);
            } catch(e) {
              console.log(e);
            }
          });
          
          connection.playConvertedStream(mixer);
        })
        .catch(console.log);
    });
    
    client.login(auth["token"]);

    return client;
  }
};