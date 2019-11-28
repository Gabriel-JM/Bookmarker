const Http = require('http')
const Url = require('url')
const BookmarkerController = require('./bookmarker/BookmarkerController')
const Bookmark = require('./bookmarker/Bookmark')

const port = process.env.PORT || 3100
const filePath = './files/bookmarkerList.json'
const bookmarkerController = new BookmarkerController(filePath)

const headers = {
	'Access-control-Allow-Origin' : '*',
	'Access-control-Allow-Methods' : 'OPTIONS, GET, POST, PUT, DELETE',
	'Access-control-Allow-Headers' : 'Content-Type',
	'Access-control-Max-Age' : 2945000,
	'Content-Type' : 'application/json'
}

const server = Http.createServer((req, res) => {
	const { url, method } = req
	const { pathname, query } = Url.parse(url, true)

	if(pathname === '/') {
		res.writeHead(200, headers)
		
		switch(method.toLowerCase()) {
			case 'get':

				if(query.id) {
					return res.end(bookmarkerController.getOne(query.id))
				}

				return res.end(bookmarkerController.getAll())

			case 'post':
				let postBody = []
		
				req.on('data', chunk => {
					
					postBody = [...postBody, chunk]

				}).on('end', () => {
					postBody = Buffer.concat(postBody).toString()

					const { siteName, siteUrl } = JSON.parse(postBody)

					const bookmark = new Bookmark(siteName, siteUrl)

					return res.end(bookmarkerController.postOne(bookmark))
				})
				break
			
			case 'put':
				let body = []
		
				req.on('data', chunk => {
					
					body = [...body, chunk]

				}).on('end', () => {
					body = Buffer.concat(body).toString()

					const bookmark = JSON.parse(body)

					return res.end(bookmarkerController.putOne(bookmark))
				})
				break
			
			case 'delete':
				return res.end(bookmarkerController.deleteOne(query.id))
			
			default:
				res.writeHead(405, headers)
				return res.end()

		}
	} else {
		res.writeHead(404, headers)
		res.end()
	}
})

server.listen(port, () => console.log(`Server on... Port: ${port}`))

function getBodyContent(request) {
	
}