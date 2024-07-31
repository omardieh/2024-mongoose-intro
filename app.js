const express = require("express");
const logger = require("morgan");
const connectDB = require("./config/db.config");
const BookModel = require("./models/Book.model");
const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

const cities = ["Miami", "Madrid", "Barcelona"];

app.get("/city-list", (req, res) => {
  const { newCity } = req.query;
  if (newCity) cities.push(newCity);
  res.json({ cities: cities });
});

app.post("/books", async (req, res) => {
  const createdBook = await BookModel.create({ ...req.body });
  res.json({ createdBook });
});

app.get("/books", async (req, res) => {
  const foundBooks = await BookModel.find();
  res.json({ foundBooks });
});

app.delete("/books/:bookID", async (req, res) => {
  const { bookID } = req.params;
  try {
    const resp = await BookModel.findByIdAndDelete(bookID);
    if (!resp) res.status(404).send({ message: "Book not found" });
    console.log(resp);
    res.send("success");
    return;
  } catch (error) {
    console.error(error);
  }
});

app.patch("/books/:bookID", async (req, res) => {
  const { bookID } = req.params;
  const updatedBook = await BookModel.findByIdAndUpdate(
    bookID,
    { ...req.body },
    { new: true }
  );
  res.json({ updatedBook });
});

connectDB();
app.listen(3001, (err) => {
  if (err) throw err;
  console.log("app is running");
});
