import { Patient, Gender } from "./types/Patient";
import { v1 as uuid } from "uuid";
import { z } from "zod";
import { Entry, HealthCheckRating } from "./types/Entry";

const id = uuid();

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HealthCheckEntryWithoutIdSchema = HealthCheckEntrySchema.omit({
  id: true,
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const OccupationalHealthcareEntryWithoutIdSchema =
  OccupationalHealthcareEntrySchema.omit({ id: true });

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const HospitalEntryWithoutIdSchema = HospitalEntrySchema.omit({ id: true });

const EntrySchema = z.union([
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

const EntryWithoutIdSchema = z.union([
  HealthCheckEntryWithoutIdSchema,
  OccupationalHealthcareEntryWithoutIdSchema,
  HospitalEntryWithoutIdSchema,
]);

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export const toNewPatient = (object: unknown): Patient => {
  const validatedNewPatient = newPatientSchema.parse(object);
  const newPatient = {
    id: id,
    ...validatedNewPatient,
  };

  return newPatient;
};

export const toNewEntry = (object: unknown): Entry => {
  const validatedNewEntry = EntryWithoutIdSchema.parse(object);
  console.log("new created entry passed for validating is", validatedNewEntry);

  const newEntry = {
    id: id,
    ...validatedNewEntry,
  };

  return newEntry;
};
