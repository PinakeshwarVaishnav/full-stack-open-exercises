import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { OptionType } from "../types/Option";
import patientService from "../services/patients";
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types/Entry";

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

  useEffect(() => {
    console.log("the value of entry type is", entryType);
  }, [entryType]);

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
        const newHealthEntry = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating,
        };
        const returnedHealthEntry = patientService.createNewEntry(
          newHealthEntry as HealthCheckEntry,
          id,
        );
        console.log("new created entry is", returnedHealthEntry);
        setEntryType(null);
        break;
      case "Hospital":
        const newHospitalEntry = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        const returnedHospitalEntry = patientService.createNewEntry(
          newHospitalEntry as HospitalEntry,
          id,
        );
        console.log("new created entry is", returnedHospitalEntry);
        setEntryType(null);
        break;
      case "OccupationalHealthCare":
        const newOccupationalHealthCare = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
          type: "OccupationalHealthcare",
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
          employerName: employerName
        };
        const returnedOccupationalHealthCareEntry =
          patientService.createNewEntry(
            newOccupationalHealthCare as OccupationalHealthcareEntry,
            id,
          );
        console.log(
          "new created entry is",
          returnedOccupationalHealthCareEntry,
        );
        setEntryType(null);
        break;
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
            {entryType && (
              <div>
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
                    type="date"
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
              </div>
            )}
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
            {entryType === "Hospital" && (
              <>
                <label>
                  Discharge Date
                  <input
                    type="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                  />
                </label>
                <label>
                  Discharge Criteria
                  <input
                    type="text"
                    value={dischargeCriteria}
                    onChange={(e) => setDischargeCriteria(e.target.value)}
                  />
                </label>
              </>
            )}
            {entryType === "OccupationalHealthCare" && (
              <>
                <label>
                  Employer Name
                  <input
                    type="text"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Sickleave Start Date
                  <input
                    type="date"
                    value={sickLeaveStartDate}
                    onChange={(e) => setSickLeaveStartDate(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Sickleave End Date
                  <input
                    type="date"
                    value={sickLeaveEndDate}
                    onChange={(e) => setSickLeaveEndDate(e.target.value)}
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
