import { Router, Request, Response } from 'express';
import data from '../../data/patients';
import { PatientWithoutSSN } from '../types/PatientWithoutSSN';
import toNewPatient from '../utils';

const router = Router();

router.get('/', (req: Request, res: Response): any => {
	console.log('request method for patients is', req.method);
	const patientsWithoutSSN: PatientWithoutSSN[] = data.map(({ ssn: _ssn, ...rest }) => rest);
	res.json(patientsWithoutSSN);
});

router.post('/', (req: Request, res: Response): any => {
	console.log('request method for patients is', req.method);
	try {
		const newPatient = toNewPatient(req.body);

		data.push(newPatient);

		res.status(201).json(newPatient);
	} catch (error: unknown) {
		let errorMessage = 'something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
