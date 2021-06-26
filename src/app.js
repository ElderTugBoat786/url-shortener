const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const db = require('./db');
const urlShortener = require('./db/model/url');

const app = express()
const port = 3000

app.use(morgan('dev'));


require('dotenv').config();

const middlewares = require('./middlewares.js');
const api = require('./api');

app.get('/:short', (req, res) => {
  urlShortener.findOne({short:req.params.short},'url',function (err, url) {
    if (err) return handleError(err);
    if (url == null) {
      res.json({error:1,data:'Short not found'})
    }else {
      res.redirect(url.url)
    }
  })
})

app.use('/api/v1', api);

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

module.exports = app
