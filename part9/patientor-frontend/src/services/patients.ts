import axios from "axios";
import { Patient, PatientFormValues } from "../types/Patient";

import { apiBaseUrl } from "../constants";
import { EntryWithoutId } from "../types/Entry";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  console.log("data received after saving new patient is", data);
  return data;
};

const createNewEntry = async (object: EntryWithoutId, patientId: string) => {
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object,
  );

  console.log("data received after saving new entry is", data);
  return data;
};

export default {
  getAll,
  getById,
  create,
  createNewEntry,
};
