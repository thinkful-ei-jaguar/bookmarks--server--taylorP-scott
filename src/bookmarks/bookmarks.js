const express = require('express')
const logger = require('../logger')
//const { bookmarks } = require('../store')
const uuid = require('uuid/v4')
const bookmarksServices = require('./bookmarks-services')

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route('/bookmarks')
  .get((req, res)=>{
    bookmarksServices
      .getAllBookmarks(req.app.get('db'))
      .then(bookmark => {
        res.json(bookmark)
      })
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

    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    }

    bookmarks.push(bookmark);
    logger.info(`Bookmark with id ${id} created`);

    res.status(201).location(`http://localhost:8080/bookmark/${id}`).json(bookmark)
  })

bookmarkRouter 
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(b => b.id == id);

    if(!bookmark){
      logger.error(`Bookmark with id ${id} not found`)
      return res  
        .status(404)
        .send('Bookmark not found')
    }
    res.json(bookmark)
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

    if (bookmarkIndex === -1){
      logger.error(`Bookmark with id ${id} not found`)
      return res.status(400).send('Not found')
    }

    bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark with id ${id} deleted.`)

    res.status(204).end();
  })


module.exports = bookmarkRouter;