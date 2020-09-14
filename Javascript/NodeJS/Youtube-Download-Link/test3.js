const youtubedl = require('youtube-dl')
const ffmpeg = require('fluent-ffmpeg')
const fs = require("fs");


var url = "https://www.youtube.com/watch?v=jeTTeLTzDEQ"
// youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
//   if (err) throw err

//   console.log(output.join('\n'))
// }).pipe(res)

ffmpeg("video.mp4").toFormat("mp3").pipe(fs.createWriteStream("audio.mp3"));