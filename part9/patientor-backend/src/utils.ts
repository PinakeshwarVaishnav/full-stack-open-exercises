import { Patient, Gender } from "./types/Patient";
import { v1 as uuid } from "uuid";

const id = uuid();

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseField = (field: unknown): string => {
	if (!isString(field)) {
		throw new Error('incorrect or missing name');
	}

	return field;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('incorrect date of birth ' + date);
	}

	return date;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('incorrect gender: ' + gender);
	}
	return gender;
};

const toNewPatient = (object: unknown): Patient => {
	if (!object || typeof object !== 'object') {
		throw new Error('incorrect or missing data');
	}

	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newPatient: Patient = {
			id: id,
			name: parseField(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseField(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseField(object.occupation)
		};

		return newPatient;
	}

	throw new Error('incorrect data: some fields are missing');
};

export default toNewPatient;
