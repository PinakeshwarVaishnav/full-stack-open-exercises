import React from "react";

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} <span>{person.number}</span>
        </p>
      ))}
    </div>
  );
};

export default Persons;
