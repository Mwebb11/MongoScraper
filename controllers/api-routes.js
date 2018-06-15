const express = require("express");
const router = express.Router();
const connection = require("../config/connection");
const axios = require('axios')
const cheerio = require('cheerio')
const db = require("../models");
    router.get("/scrape", function(req, res) {
    axios.get("https://www.cnn.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      $("div.u-text-h4.u-text-flow").each(function(i, element) {
        
        var result = {};
        result.title = $(this)
          .text();
        result.link = $(this)
          .parent("a")
          .attr("href");
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });
  
      
      res.send("Scrape Complete");
    });
  });
  
  router.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  
  router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  

  router.post("/articles/:id", function(req, res) {
    
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {

        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });





module.exports = router