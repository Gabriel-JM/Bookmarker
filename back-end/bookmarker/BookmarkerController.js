const fs = require('fs')

class BookmarkerController {

	constructor(filePath) {
		this.filePath = filePath
	}

	getAll() {
		const fileContent = fs.readFileSync(this.filePath)

		return fileContent
	}

	getOne(id) {
		const bookmarks = JSON.parse(this.getAll())

		const theOne = bookmarks.find(bookmark => {
			return bookmark.id == id
		})

		const stringifyOne = JSON.stringify(theOne)

		return stringifyOne || this.returnMessage('Not found!', false)
	}

	postOne(bookmark) {
		const fileContent = JSON.parse(this.getAll())
		let bookMarkArray = fileContent

		bookMarkArray = [...bookMarkArray, bookmark]
		const bookMarks = JSON.stringify(bookMarkArray)

		fs.writeFileSync(this.filePath, bookMarks)

		return JSON.stringify(bookmark)
	}

	putOne(bookmarkToAlter) {
		const { id, siteName, siteUrl } = bookmarkToAlter
		const bookmarkArray = JSON.parse(this.getAll())

		const bookmark = bookmarkArray.find(bookmark => bookmark.id == id)

		if (bookmark) {
			bookmark.siteName = siteName
			bookmark.siteUrl = siteUrl

			return this.rePostAll(bookmarkArray)
		}

		return this.returnMessage('Id not found!', false)
	}

	rePostAll(bookmarksArray) {
		const bookmarks = JSON.stringify(bookmarksArray)

		fs.writeFileSync(this.filePath, bookmarks)

		return this.getAll()
	}

	deleteOne(id) {
		const bookmarkArray = JSON.parse(this.getAll())

		const bookmarkExists = bookmarkArray.some(bookmark => bookmark.id == id)

		const newBookmarkArray = bookmarkArray.filter(bookmark => {
			return bookmark.id != id
		})

		this.rePostAll(newBookmarkArray)

		if (bookmarkExists) {
			return this.returnMessage('Successful delete!', true)
		} else {
			return this.returnMessage('Not found!', false)
		}
	}

	returnMessage(text, approve) {
		return JSON.stringify({
			message: text,
			ok: approve
		})
	}
}

module.exports = BookmarkerController