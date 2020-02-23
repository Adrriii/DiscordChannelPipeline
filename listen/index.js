module.exports = {
  start: function (output) {

    const Discord = require('discord.js');
    const { Readable } = require('stream');
    const fs = require('fs');
    var auth = require('./auth.json');  
    const client = new Discord.Client();
    
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    // make a new stream for each time someone starts to talk
    function generateOutputFile(channel, member) {
      // use IDs instead of username cause some people have stupid emojis in their name
      const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
      return fs.createWriteStream(fileName);
    }
    
    client.on('message', msg => {
      // Voice only works in guilds, if the message does not come from a guild,
      // we ignore it
      if (!msg.guild) return;
    
      if (msg.content === 'ecoute moi') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (msg.member.voiceChannel) {
          channel = 680915973360058414;
          voiceChannel = msg.member.voiceChannel
            voiceChannel.join()
            .then(conn => { // Connection is an instance of VoiceConnection
              // create our voice receiver
              const receiver = conn.createReceiver();      

              conn.on('speaking', (user, speaking) => {
                if (speaking) {
                  // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
                  const audioStream = receiver.createPCMStream(user);
                  // pipe our audio data into the file stream
                  audioStream.pipe(output);
                  output.on('data', console.log);
                }
              });
            })
            .catch(console.log);
        } else {
          msg.reply('t pas en voc');
        }
      }
    });
    
    // listen
    client.login(auth["token"]);

    return client;
  }
};