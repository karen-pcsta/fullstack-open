const express = require("express");
const app = express();
const date = new Date();

app.use(express.json());

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(contacts);
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${contacts.length} people.
    
   ${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = contacts.find((person) => person.id === id);

  if (!person) {
    res.status(404).send;
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((person) => person.id !== id);
  res.status(204).end();
});

function generateNewId() {
  const newId = contacts.length > 0 ? Math.floor(Math.random() * 50) + 1 : 0;

  return newId;
}

app.post("/api/persons", (req, res) => {
  const newContact = req.body;
  newContact.id = generateNewId();
  console.log(newContact);
  contacts = contacts.concat(newContact);

  res.json(newContact);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
