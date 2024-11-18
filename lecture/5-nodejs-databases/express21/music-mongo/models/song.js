import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    code: Number,
    title: String,
    artist: String,
    album: String,
    runtime: Number
  }
);

export default mongoose.model('mysong', SongSchema );