import { useState } from "react";
import { Filter } from "./Components/Filter";
import { PersonForm } from "./Components/PersonForm";
import { Person } from "./Components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [filteredList, setFilteredList] = useState("");

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleSearchChange(e) {
    setNewSearch(e.target.value);
    filterContacts();
  }

  function filterContacts() {
    const searchResults = persons.filter((person) =>
      person.name.toLowerCase().includes(newSearch.toLowerCase())
    );
    setFilteredList(searchResults);
  }

  function addNewContact(e) {
    e.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber,
    };
    const hasName = persons.some((person) => person.name === nameObj.name);
    if (!hasName) {
      setPersons(persons.concat(nameObj));
    } else {
      alert(`${newName} is already added to phonebook.`);
    }
    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />

      <h3>Add a New</h3>
      <PersonForm
        onSubmit={addNewContact}
        value={[newName, newNumber]}
        onChangeFunction={[handleNameChange, handleNumberChange]}
      />
      <h3>Numbers</h3>
      {!filteredList
        ? persons.map((person) => <Person key={person.name} personInfo={person} />)
        : filteredList.map((person) => <Person key={person.name} personInfo={person} />)}
    </div>
  );
};

export default App;
