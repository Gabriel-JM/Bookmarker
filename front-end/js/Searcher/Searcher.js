"use strict"

import MainUI from '../UI/MainUI.js'
import Messager from '../UI/Messager.js'

const siteListQuery = '[sites-list]'

const mainUI = new MainUI()
const messager = new Messager()

export default class Searcher {

    search(inputValue, array) {

        if(array.length) {
            const result = array.filter(item => {
                return RegExp(inputValue.toLowerCase()).test(item.siteName.toLowerCase())
            })

            mainUI.showItems(siteListQuery, result)

            if(!result.length) {
                messager.addNoItemsMessage(siteListQuery)
            } else {
                messager.removeNoItemsMessage()
            }
        }

    }

}