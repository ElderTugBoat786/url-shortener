const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const db = require('../db');
const urlShortener = require('../db/model/url');

router.get( '/' , (req,res) => {
  res.send('🥽')
})

router.get( '/create' , (req,res) => {

  if (req.query.url != null && req.query.short != null) {

    urlShortener.findOne({short: req.query.short},'short',function(err,url){
      if (url != null) {
        res.json({error:1,data:'Short alread exits'})
      }else {
        url = new urlShortener({
            url:req.query.url,
            short : req.query.short,
            click : 0,
            key : req.query.hasOwnProperty('key') ? req.query.key : mongoose.Types.ObjectId() })
        url.save(function (err) {
          if (err){
            res.send({error: 1, data:"Short Url not saved"})         // return handleError(err);
          }else {
            res.send({error:0,data:url})
          }
        });
      }
    })

  }else {
    res.json({error:1,data:'Missing url or shor link'})
  }
})

router.get( '/update/', (req,res) => {
  res.json({error : 0, data : 'wip'})
})

router.get( '/delete/', async (req,res) => {
  if (req.query.key != null && req.query.short != null) {
    var r = await urlShortener.deleteOne({key : req.query.key, short : req.query.short})
    res.json({error: r ? 1 : 0, data : r ? 'Success' : 'Failed'})
  }else {
    res.json({error : 1, data : 'Missing param'})
  }
})

router.get('/createKey',(req,res) => {
  res.json({error : 0,data : {key : mongoose.Types.ObjectId()}})
})

module.exports = router;
