import { Diagnosis } from "../types/Diagnosis";
import { apiBaseUrl } from "../constants";
import axios from "axios";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export default getAll;
