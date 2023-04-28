require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const date = new Date();
const Contact = require("./models/contact");

app.use(express.json());
app.use(express.static("build"));
morgan.token("content", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"));

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts);
  });
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${contacts.length} people.
    
   ${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then((contact) => {
    res.json(contact);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or Number missing" });
  }

  const newContact = new Contact({
    name: body.name,
    number: body.number,
  });

  newContact.save().then((savedContact) => {
    res.json(savedContact);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
