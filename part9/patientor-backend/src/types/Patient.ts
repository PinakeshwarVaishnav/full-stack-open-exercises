import { Entry } from "./Entry";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;

  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
