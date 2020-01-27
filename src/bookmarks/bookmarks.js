const express = require('express')
const logger = require('../logger')
const {bookmarks} = require('../store')

const bookmarkRouter = express.Router();

bookmarkRouter
  .route('/bookmarks')
  .get((req, res)=>{
    res.send(bookmarks)
  })

bookmarkRouter 
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(book => book.id == id);

    if(!bookmark){
      logger.error(`Bookmark with id ${id} not found`)
      return res  
        .status(404)
        .send('Bookmark not found')
    }
    res.send(bookmark)
  })


module.exports = bookmarkRouter;