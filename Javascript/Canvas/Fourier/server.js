import http from 'http'
import express from 'express'
import { dirname  } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const hostname = '127.0.0.1'
const port = 8000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World')
// });

console.log(__dirname)
app.use('/css', express.static('css'))
app.use('/libs', express.static('libs'))
app.use('/models', express.static('models'))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/index.html');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
