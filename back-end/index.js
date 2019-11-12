const express = require('express')
const cors = require('cors')
const fs = require('fs')

const port = process.env.port || 3100
const filePath = './files/bookMarker.json'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    let file = ''

    fs.readFile(filePath, (err, data) => {
        if (err) throw err
        file = data
        res.send(file)
    })
})

app.post('/', (req, res) => {
    const content = fs.readFileSync(filePath)
    let bookMarkerArray = JSON.parse(content.toString())

    bookMarkerArray = [
        ...bookMarkerArray,
        req.body
    ]

    const bookMarkers = JSON.stringify(bookMarkerArray)

    fs.writeFile(filePath, bookMarkers, err => {
        if (err) throw err
        res.send(req.body)
    })
})

app.listen(port)