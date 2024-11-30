import { Router, Request, Response } from 'express';
import { v1 as uuid } from 'uuid';
import data from '../../data/patients';
import { PatientWithoutSSN } from '../types/PatientWithoutSSN';
import { Patient } from '../types/Patient';

const router = Router();

router.get('/', (req: Request, res: Response): any => {
	console.log('request method for patients is', req.method);
	const patientsWithoutSSN: PatientWithoutSSN[] = data.map(({ ssn: _ssn, ...rest }) => rest);
	res.json(patientsWithoutSSN);
});

router.post('/', (req: Request, res: Response): any => {
	console.log('request method for patients is', req.method);
	const { name, dateOfBirth, ssn, gender, occupation }: Patient = req.body;

	if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
		res.status(400).json({ error: 'missing required fields' });
		return;
	}

	const newPatient: Patient = {
		id: uuid(),
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation
	};

	data.push(newPatient);

	res.status(201).json(newPatient);

});

export default router;
