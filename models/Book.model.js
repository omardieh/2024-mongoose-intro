const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  codeISBN: {
    type: String,
    maxLength: 100,
    unique: true,
  },
  quantity: { type: Number, min: 0, default: 0 },
  lastPublished: { type: Date, default: Date.now },
  genre: { type: String, enum: ["romance", "fiction", "biography", "poetry"] },
  author: String,
});

module.exports = model("Book", bookSchema);
