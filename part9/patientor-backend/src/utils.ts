import { Patient, Gender } from "./types/Patient";
import { v1 as uuid } from "uuid";
import { z } from "zod";

const id = uuid();

export const newPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	gender: z.nativeEnum(Gender),
	occupation: z.string()

});

export const toNewPatient = (object: unknown): Patient => {


	const validatedNewPatient = newPatientSchema.parse(object);
	const newPatient = {
		id: id,
		...validatedNewPatient
	};

	return newPatient;
};


export default toNewPatient;
