const { pipeline, Readable, Writable } = require('stream');
const fs = require('fs')

write = fs.createWriteStream('void');

read = fs.createReadStream('void',{flags:'r'})

.on('data', function(chunk) {
    console.log(chunk);
})

.on('error', function(err) {
    console.log(err);
})

.on('readable', function () {
    console.log('ready to start');
    this.read();
});

var listen = require('./listen');
var speak = require('./speak');

var client_listen = listen.start(write);
var client_speak = speak.start(read);

// pipeline(listen,write,
//     (err) => {
//       if (err) {
//         console.error('Pipeline failed.', err);
//       } else {
//         console.log('Pipeline succeeded.');
//       }
//     }   );