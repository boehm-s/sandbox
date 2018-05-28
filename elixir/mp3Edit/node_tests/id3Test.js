const NodeID3 = require('node-id3');
// const mm = require('music-metadata');
const util = require('util');

// mm.parseFile('../test/samples/Mu' +
//  './mp3/nested/07 Talk On The Street.mp3', {native: true})
//   .then(function (metadata) {
//     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
//   })
//   .catch(function (err) {
//     console.error(err.message);
//   });

let tags = NodeID3.read('./mp3/nested/plop.mp3');
console.log(tags);
