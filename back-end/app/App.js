const Bookmark = require('../bookmarker/Bookmark')
const BookmarkerController = require('../bookmarker/BookmarkerController')

const filePath = './files/bookmarkerList.json'
const bookmarkerController = new BookmarkerController(filePath)
const headers = {
    'Access-control-Allow-Origin' : '*',
    'Access-control-Allow-Methods' : 'OPTIONS, GET, POST, PUT, DELETE',
    'Access-control-Allow-Headers' : 'Content-Type',
    'Access-control-Max-Age' : 2945000,
    'Content-Type' : 'application/json'
}

class App {

    constructor(res, content) {
        this.res = res
        this.content = content
        this.run()
    }

    run() {
        const { body, method, pathname, query } = this.content

        if(pathname === '/') {
            this.res.writeHead(200, headers)
            
            switch(method.toLowerCase()) {
                case 'get':
                    if(query.id) {
                        return this.res.end(bookmarkerController.getOne(query.id))
                    }

                    return this.res.end(bookmarkerController.getAll())

                case 'post':
                    const { siteName, siteUrl } = JSON.parse(body)

                    const bookmark = new Bookmark(siteName, siteUrl)

                    return this.res.end(bookmarkerController.postOne(bookmark))
                
                case 'put':
                    const bookmarkToAlter = JSON.parse(body)

                    return this.res.end(bookmarkerController.putOne(bookmarkToAlter))
                
                case 'delete':
                    return this.res.end(bookmarkerController.deleteOne(query.id))
                
                case 'options':
                    this.res.writeHead(204, headers)
                    return this.res.end()

                default:
                    this.res.writeHead(405, headers)
                    return this.res.end()
            }
        } else {
            this.res.writeHead(404, headers)
            this.res.end()
        }
    }

}

module.exports = App