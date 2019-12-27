var monmodule = require('./mymodule');
var markdown = require('markdown').markdown;
// var text = require('./text');
var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/html"});
    if (page == '/') {
      monmodule.direBienvenue(res);
    } else if (page == '/markdown') {
      res.write(markdown.toHTML('Un paragraphe en **markdown** !'));
    } else if (page == '/bonjour') {
        monmodule.direBonjour(res);
    } else if (page == '/bye') {
        monmodule.direByeBye(res);
    }
    res.end();
});
server.listen(8080);
