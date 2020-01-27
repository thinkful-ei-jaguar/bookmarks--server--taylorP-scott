const express = require('express')
const logger = require('../logger')
const {bookmarks} = require('../store')
const uuid = require('uuid/v4')

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route('/bookmarks')
  .get((req, res)=>{
    res.send(bookmarks)
  })
  .post(bodyParser, (req,res)=>{
    const id = uuid();
    const { title, url, description, rating } = req.body;

    if(!title) {
      logger.error('Title is required');
      return res.status(400).send('Invalid Title')
    }

    if(!url) {
      logger.error('URL is required');
      return res.status(400).send('Invalid URL')
    }

    if(!description) {
      logger.error('Description is required');
      return res.status(400).send('Invalid Description')
    }

    if(!rating || typeof(rating) !== 'number' || rating > 5) {
      logger.error('Rating is required');
      return res.status(400).send('Invalid Rating, must be a number less than 5')
    }

    // if(isNaN(rating)) {
    //   logger.error('Rating is required');
    //   return res.status(400).send('Invalid Rating, must be a number less than 5')
    // }

    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    }

    bookmarks.push(bookmark);
    logger.info(`Bookmark with id ${id} created`);

    res.status(201).location(`http://localhost:8080/bookmark/${id}`).send(bookmark)
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