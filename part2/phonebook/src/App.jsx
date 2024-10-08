import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import users from "./services/users";
import Notification from "./components/Notification";
import ErrorMessage from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("effect");
    users.getAll().then((initialUsers) => {
      setPersons(initialUsers);
    });
  }, []);
  console.log(typeof persons)
  console.log("render", persons.length, "persons");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    const existingUser = persons.find((person) => person.name === newName);

    if (existingUser) {
      if (
        window.confirm(
          `${existingUser.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        axios
          .put(`https://full-stack-open-exercises-2.onrender.com/api/persons/${existingUser.id}`, {
            ...existingUser,
            number: newNumber,
          })
          .then((response) => {
            console.log("Update successful: ", response.data);
            const updatedState = persons.map((person) =>
              person.name === newName
                ? { ...person, number: newNumber }
                : person
            );
            setPersons(updatedState);
            setNotificationMessage(`Updated ${newName}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setPersons(persons.filter((person) => person.name !== newName));
            console.error("Error updating data:", error);
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      const newUser = {
        name: newName,
        number: newNumber,
      };

      axios.post('https://full-stack-open-exercises-2.onrender.com/api/persons', newUser)
        .then(response => {
          console.log('Phonebook entry created: ', response.data)
        })
        .catch(error => {
          console.error('Error in saving entry: ', error)
        })

      users.create(newUser).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`Added ${newName}`);
      })
        .catch(error => {
          setErrorMessage(error.respone.data.error)
          console.log(error.response.data.error)
        })
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      axios
        .delete(`https://full-stack-open-exercises-2.onrender.com/api/persons/${id}`)
        .then(() => {
          console.log("Entry deleted successfully");
          users.getAll().then((initialUsers) => {
            setPersons(initialUsers);
          });
        })
        .catch((error) => {
          console.error("Error deleting entry:", error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} duration={3000} />
      <ErrorMessage message={errorMessage} duration={3000} />
      <Filter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleInputChange={handleInputChange}
        handleNumberInputChange={handleNumberInputChange}
        handleButtonClick={handleButtonClick}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
