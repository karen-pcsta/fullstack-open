import { useState, useEffect } from "react";
import { Filter } from "./Components/Filter";
import { PersonForm } from "./Components/PersonForm";
import { Person } from "./Components/Person";
import contactService from "./Services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    contactService.getAll().then((response) => {
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

  function updatePhoneNumber(phoneNumber) {
    const currentContact = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
    const changedPhoneNumber = { ...currentContact, number: phoneNumber };
    contactService.update(currentContact.id, changedPhoneNumber).then((response) => {
      // console.log(response);
      setPersons(persons.map((person) => (person.id !== currentContact.id ? person : response.data)));
    });
  }

  function addNewContact(e) {
    e.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber,
    };
    const hasName = persons.some((person) => person.name.toLowerCase() === nameObj.name.toLowerCase());
    if (!hasName) {
      contactService.create(nameObj).then((response) => {
        // console.log(response.data);
        setPersons(persons.concat(response.data));
      });
    } else {
      if (
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        updatePhoneNumber(newNumber);
      }
    }
    setNewName("");
    setNewNumber("");
  }

  function deleteContact(id) {
    const currentObj = persons.find((person) => person.id === id);
    const changedContactList = persons.filter((person) => person.id !== currentObj.id);
    if (window.confirm(`Delete ${currentObj.name}?`)) {
      contactService.remove(id);
      setPersons(changedContactList);
    }
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
        ? persons.map((person) => (
            <Person key={person.name} personInfo={person} eventHandler={deleteContact} />
          ))
        : filteredList.map((person) => (
            <Person key={person.name} personInfo={person} eventHandler={deleteContact} />
          ))}
    </div>
  );
};

export default App;
