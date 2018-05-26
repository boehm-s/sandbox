const NodeID3 = require('node-id3');

let tags = NodeID3.read('./../mp3/01 - 21st Century Schizoid Man.mp3');
console.log(tags);
