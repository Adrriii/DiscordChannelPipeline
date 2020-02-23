module.exports = {
  start: function () {

    const Discord = require('discord.js');
    const { Readable } = require('stream');
    const fs = require('fs');
    var auth = require('./auth.json');  
    const client = new Discord.Client();
    
    class Silence extends Readable {
      _read() {
        this.push(Buffer.from([0xF8, 0xFF, 0xFE]));
      }
    }

    // make a new stream for each time someone starts to talk
    function generateOutputFile(channel, member) {
      // use IDs instead of username cause some people have stupid emojis in their name
      const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
      return fs.createWriteStream(fileName);
    }
    
    function listenToServer(client, id) {

      voiceChannel = client.channels.cache.get(id) // // 680915973360058414 "466982261351383043"
        voiceChannel.join()
        .then(conn => { // Connection is an instance of VoiceConnection
          conn.play(new Silence(), { type: 'opus' });

          client.emit('connected', conn);
        })
        .catch(console.log);
    }

    client.on('ready', msg => {
      //listenToServer(client, "466982261351383043");
      listenToServer(client, "680915973360058414");
    });
    
    // listen
    client.login(auth["token"]);

    return client;
  }
};