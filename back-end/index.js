const express = require('express')
const cors = require('cors')
const BookmarkerController = require('./bookmarker/BookmarkerController')
const Bookmarker = require('./bookmarker/Bookmarker')

const port = process.env.port || 3100
const bookmarkerController = new BookmarkerController('./files/bookMarker.json')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(bookmarkerController.getAll())
})

app.post('/', (req, res) => {
    const { siteName, siteUrl } = req.body
    const bookmarker = new Bookmarker(siteName, siteUrl)

    res.send(bookmarkerController.postOne(bookmarker))
})

app.put('/', (req, res) => {
	res.send(bookmarkerController.putOne(req.body))
})

app.listen(port, () => console.log('Server on!'))