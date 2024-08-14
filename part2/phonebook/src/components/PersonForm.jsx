import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleInputChange,
  handleNumberInputChange,
  handleButtonClick,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInputChange} />
      </div>
      <div>
        <button type="submit" onClick={handleButtonClick}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
