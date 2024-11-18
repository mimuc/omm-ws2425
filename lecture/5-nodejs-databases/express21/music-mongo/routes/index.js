import express from "express";
const router = express.Router();
import mongoose from "mongoose";

import Song from "../models/song.js";

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/music';
mongoose.connect(mongoDB);
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log('db initiated');

/* GET home page. */
router.get('/', (req, res, next) => {
  Song.find({}, (err, list) => {
    if (err)
      console.log(err);
    else {
      console.log(list);
      res.render('music', {songlist: list});
    }
  })
});

export default router;
