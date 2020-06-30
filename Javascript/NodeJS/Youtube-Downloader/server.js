const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
// const youtubedl = require('youtube-dl')
// const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// console.log(ffmpegInstaller.path, ffmpegInstaller.version);

module.exports = ffmpeg;
const fs = require('fs');
const app = express();

app.use(cors());
app.use('/style.css', express.static('style.css'));
app.use('/index.js', express.static('index.js'));


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Using port '+String(PORT));
});

var server = app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

server.timeout = 300_000;

const baseLink = "https://www.youtube.com/watch?v=";
const videofilename = "video.mp4";

app.get('/download', function(req,res) {
    var id = String(req.query.id);
    var url = baseLink + id;
    var filename;
    console.log("0:starting getting info")

    ytdl.getInfo(id, function(err, info) {
        title = info.title;
        filename = `${title}.mp3`;
        console.log('0: - title:', title);
        console.log('0: - url:', url);
        console.log("0:finished getting info")
        console.log("1:starting server downloading")
        var stream1 = ytdl(url).pipe(fs.createWriteStream('video.mp4'))
        .on("finish", () => {
            console.log('1:finished server downloading');
            var stream2 = ffmpeg(videofilename)
            .output(filename)
            .on('start', function(cmd) {
                console.log('2:starting ffmpeg conversion');
            })
            .on('error', function(err) {
                console.error('2:An error occurred: ',err.message);
            })
            .on("end", () => {
                console.log('2:finished conversion');
                console.log('3:starting client download');
                res.download(__dirname+'/'+filename);
                console.log('3:finished client download');
                console.log('4:starting cleaning');
                setTimeout(function () {
                    fs.unlinkSync(__dirname+'/'+filename);
                    fs.unlinkSync(__dirname+'/'+videofilename);
                }, 5000);
                console.log('4:finished cleaning');
                console.log("5:Download process of")
                console.log('5: - title:', title);
                console.log('5: - url:', url);
                console.log('5:is completed.')
            }).run();
        });
    });
});

   
    
    
    // res.sendFile(__dirname+'/'+'audio.mp3')
    


    // ffmpeg("video.mp4").toFormat("mp3").pipe("audio.mp3");

    // const opts = ['-x', '--audio-format', 'mp3'];
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

    // ytdl(url, {filter:'audioonly'}).pipe(fs.createWriteStream('audio.mp3'));

    // const video = ytdl(url, {filter:'audio'});

    // opts = ['-o', 'video.mp4']

    // const video = youtubedl(url, opts, {start: downloaded, cwd: __dirname })
    // youtubedl()
 
    // Will be called when the download starts.
    // video.on('info', function(info) {
    //     console.log('Download started')
    //     console.log('filename: ' + info._filename)
    //     console.log('size: ' + info.size)
    //     if (downloaded > 0) {
    //         // size will be the amount already downloaded
    //         console.log('resuming from: ' + downloaded)
         
    //         // display the remaining bytes to download
    //         console.log('remaining bytes: ' + info.size)
    //     }
    // })

    // video.on('end', function() {
    //     console.log('finished downloading!')
    //     res.header('Content-Disposition', `attachment; filename="audio.mp3"`);
    //     // res.download('audio.mp3');
    //     ffmpeg("video.mp4").toFormat("mp3").pipe(res);
    // })

    // ffmpeg("video.mp4").toFormat("mp3");
    
    
    // fs.createWriteStream(destDir + '\\' + videoName + '.mp3'); 
    // var stream = fs.createWriteStream("theaudio.mp3")

    // video.pipe(stream);
    // var name;

    // fs.readdir('.', (err, files) => {
    //     files.forEach(file => {
    //       if (file=="audio.mp3") {
    //         fs.unlinkSync("audio.mp3");
    //       }
    //     });
    //   });

    //   process.chdir("../");


    // youtubedl.exec(url, ['-x', '--audio-format', 'mp3', '-o', 'audio.mp3'], {}, function(err, output) {
    //     if (err) throw err
    //     console.log(output.join('\n'))
    // });


    // fs.unlinkSync(path)

    // console.log('downloading now');
    // res.download('audio.mp3');


    

    // request
    //     .get('')
    //     .on('error', function(err) {
    //         // handle error
    //     })
    // .pipe(res);

    // var stream = fs.createWriteStream("video.mp4")
    // stream = ytdl(url).pipe(fs.createWriteStream(mp4))
    // var stream = ytdl(url)
    // var proc = new ffmpeg({source:stream});
    // // proc.setFfmpegPath('/Applications/ffmpeg')
    // var proc = new ffmpeg({source:mp4})
    // proc.saveToFile(mp3, (stdout, stderr) =>
    //     console.log('done')
    // )
    // ytdl(url, {format: 'mp4'}).pipe(res);
    // ytdl(url, {format:'mp4'}).pipe(res);
    // youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
    //     if (err) throw err
    //     console.log(output.join('\n'))
    // })

    // request
    //     .get('http://foo.com/bar.mp3')
    //     .on('error', function(err) {
    //         // handle error
    //     })
    //     .pipe(fs.createWriteStream('2.mp3'));
    
    // video.pipe(res);
