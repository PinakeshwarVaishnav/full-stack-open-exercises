export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export interface Patient {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: string
	occupation: string
}
