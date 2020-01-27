const express = require('express')
const {bookmarks} = require('../store')

const bookmarkRouter = express.Router();

bookmarkRouter
  .route('/bookmarks')
  .get((req, res)=>{
    res.send(bookmarks)
  })


module.exports = bookmarkRouter;