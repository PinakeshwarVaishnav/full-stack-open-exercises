import { Patient } from './Patient';

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;
