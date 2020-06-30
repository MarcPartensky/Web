const express = require('express'),
        http = require('http');


const app = express();
const server = http.createServer(app);

server.listen(process.env.PORT || 8000);

app.use('/client', express.static('client'));
app.use('/sprites', express.static('sprites'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
