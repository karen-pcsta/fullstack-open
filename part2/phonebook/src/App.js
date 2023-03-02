import { useState } from "react";

const Person = ({ personInfo }) => {
  return (
    <>
      <ul>
        <li>{personInfo.name}</li>
      </ul>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function addNewName(e) {
    e.preventDefault();
    const nameObj = {
      name: newName,
    };
    const hasName = persons.some((person) => person.name === nameObj.name);
    if (!hasName) {
      setPersons(persons.concat(nameObj));
    } else {
      alert(`${newName} is already added to phonebook.`);
    }
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} personInfo={person} />
      ))}
    </div>
  );
};

export default App;
