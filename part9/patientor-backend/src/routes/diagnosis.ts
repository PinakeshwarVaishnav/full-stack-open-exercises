import { Router, Request, Response } from "express";
import data from '../../data/diagnoses';

const router = Router();

router.get('/', (req: Request, res: Response): any => {
	console.log('http method for diagnoses route is ', req.method);
	res.json(data);
});

export default router;
