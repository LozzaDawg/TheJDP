const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Log = require('../models/log');

router.get('/', (req, res, next) => {
  Log
    .find()
    .select("-__v﻿")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        logs: docs.map(doc => {
          return{
            title: doc.title,
            publishDate: doc.publishDate,
            author: doc.author,
            logType: doc.logType,
            logProgress: doc.logProgress,
            content: doc.content,
            url: "http://localhost:3000/logs/" + doc._id
          }
        })
      };
      if(docs.length > 0){
        const validLogs = [];
        for (var i = 0; i < docs.length; i++) {
          validLogs.push(response.logs[i])
        }
        res.render('logs', {logs:validLogs});
        res.status(200);
      } else {
        res.status(200).json({
          message: 'No Articles'
        });
      }
    })
    .catch(err =>{
      res.status(500).json({
        error:err
      });
    })
});

router.post('/', (req, res, next) => {
  const log = new Log({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    logType: req.body.logType,
    logProgress: req.body.logProgress,
    content: req.body.content
  })
  log
    .save()

    .then(result=> {
      res.status(201).json({
        message: "Log Created",
        newLog:{
          _id: new mongoose.Types.ObjectId(),
          title: result.title,
          author: result.author,
          publishDate: result.publishDate,
          logType: result.logType,
          logProgress: result.logProgress + "%",
          content: result.content
          // url:{
          //   type: "GET",
          //   url: "http://localhost:3000/elementals/" + result._id
          // }
        }
      });
    })

    .catch(err => {
      res.status(500).json({
        error:err
      });
    })
});

module.exports = router;
