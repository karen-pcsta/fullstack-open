import { useState, useEffect } from "react";
import axios from "axios";
import { Filter } from "./Components/Filter";
import { PersonForm } from "./Components/PersonForm";
import { Person } from "./Components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
