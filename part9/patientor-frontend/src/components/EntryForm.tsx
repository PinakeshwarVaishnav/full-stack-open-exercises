import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { OptionType } from "../types/Option";
import patientService from "../services/patients";

interface EntryFormProps {
  id: string;
}

const EntryForm: React.FC<EntryFormProps> = ({ id }) => {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const toggleFormVisibility = () => {
    setFormVisible((prevState) => !prevState);
  };

  const handleEntryTypeChange = (option: OptionType | null) => {
    setEntryType(option ? option.value : null);
    console.log("selected option", option);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    switch (entryType) {
      case "HealthCheck":
        const newEntry = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating,
        };
        const returnedEntry = patientService.createNewEntry(newEntry, id);
        console.log("new submitted entry is", returnedEntry);
    }

    //
    setFormVisible(false);
  };

  const options: OptionType[] = [
    { value: "HealthCheck", label: "HealthCheck" },
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthCare", label: "OccupationalHealthCare" },
  ];

  return (
    <div>
      {isFormVisible && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <h3>Create New Entry:</h3>
              <Select
                value={entryType}
                onChange={handleEntryTypeChange}
                options={options}
                placeholder="Choose a entry type"
              ></Select>
            </label>
            <br />
            <h3>New {entryType} entry</h3>
            <label>
              Description
              <input
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Date
              <input
                required
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Specialist
              <input
                required
                type="text"
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              />
            </label>
            <br />
            <label>
              Diagnosis codes
              <input
                type="text"
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value)}
              />
            </label>
            <br />
            {entryType === "HealthCheck" && (
              <>
                <label>
                  Health Check Rating
                  <input
                    type="number"
                    value={healthCheckRating}
                    onChange={(e) =>
                      setHealthCheckRating(Number(e.target.value))
                    }
                  />
                </label>
              </>
            )}
            <br />
            <button type="submit">add entry</button>
          </form>
        </div>
      )}
      <br />
      <button onClick={toggleFormVisibility}>
        {isFormVisible ? "CANCEL" : "Add Entry"}
      </button>
    </div>
  );
};

export default EntryForm;
