require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helemt = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production'
? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helemt());

app.get('/', (req, res, next)=>{
  res.json({ message: 'Hello World' });
});

app.use((error, req, res, next)=>{
  let response;
  if(NODE_ENV === 'production'){
    response = { error: 'Internal Service Error' }
  }
  else {
    console.log(error)
    response = {message: error.message, error}
  }
  res.status(500).json(response);
});

module.exports = app;