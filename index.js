
var listen = require('./listen');
var speak = require('./speak');

listen.start().on('connected', conn => {speak.start(conn)});