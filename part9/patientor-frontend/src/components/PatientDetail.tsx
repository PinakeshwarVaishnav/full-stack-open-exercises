import { useParams } from "react-router-dom";
import { Patient } from "../types/Patient";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import getAll from "../services/diagnosis";
import { Diagnosis } from "../types/Diagnosis";

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id received is", id);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const getPatientById = async () => {
      if (id) {
        const patientResponse = await patientService.getById(id);
        setPatient(patientResponse);
        const diagnosisResponse = await getAll();
        setDiagnosis(diagnosisResponse);
      } else {
        console.log("patient id is undefined");
      }
    };
    getPatientById();
  }, [id]);

  if (!patient || !diagnosis) {
    return <div>Loading...</div>;
  }

  console.log("patient is", patient);
  console.log("diagnosis are", diagnosis);

  const diagnosisCodes = patient.entries.flatMap(
    (entry) => entry.diagnosisCodes || [],
  );

  return (
    <div>
      <h1>Patient Details</h1>
      <p>Name: {patient.name}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      <p>
        {patient.entries.map((entry) => entry.date)}{" "}
        {patient.entries.map((entry) => entry.description)}
      </p>
      <ul>
        {diagnosisCodes.map((code) => (
          <li key={code}>
            {code}{" "}
            {diagnosis.map((diagnosis) => {
              if (code === diagnosis.code) {
                return diagnosis.name;
              }
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetail;
