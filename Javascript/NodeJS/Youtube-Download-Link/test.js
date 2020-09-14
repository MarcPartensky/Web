const fs = require('fs');
// const ytdl = require('ytdl-core');
const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
  // Optional arguments passed to youtube-dl.
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname })
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
 
ytdl('https://www.youtube.com/watch?v=eF551z9KlA8')
  .pipe(fs.createWriteStream('video.mp4'));