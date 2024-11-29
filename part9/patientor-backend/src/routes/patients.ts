import { Router, Request, Response } from 'express';
import data from '../../data/patients';
import { PatientWithoutSSN } from '../types/PatientWithoutSSN';

const router = Router();

router.get('/', (req: Request, res: Response): any => {
	console.log('request method for patients is ', req.method);
	const patientsWithoutSSN: PatientWithoutSSN[] = data.map(({ ssn: _ssn, ...rest }) => rest);
	res.json(patientsWithoutSSN);
});

export default router;
