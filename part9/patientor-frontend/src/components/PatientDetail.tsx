import { useParams } from "react-router-dom";
import { Patient } from "../types/Patient";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import EntryDetail from "./EntryDetail";

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id received is", id);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getPatientById = async () => {
      if (id) {
        const patientResponse = await patientService.getById(id);
        setPatient(patientResponse);
      } else {
        console.log("patient id is undefined");
      }
    };
    getPatientById();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  console.log("patient is", patient);

  return (
    <div>
      <h1>Patient Details</h1>
      <p>Name: {patient.name}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetail entry={entry} key={entry.id} />
      ))}
    </div>
  );
};

export default PatientDetail;
