const http = require('http')
const port = process.env.port || 3100

function onRequest(req, res) {
    // res.setHeader('Acess-Control-Allow-Origin', '*')
    res.writeHead(200, { 'Content-Type':'application/json' })
    res.end(JSON.stringify({message: 'Hello'}))
}

const server = http.createServer(onRequest)

server.listen(port, () => console.log('Server on...'))