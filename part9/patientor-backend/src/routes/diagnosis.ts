import { Router, Request, Response } from "express";
import data from '../../data/diagnoses';

const router = Router();

router.get('/', (req: Request, res: Response): any => {
	console.log('http method for dianoses route is ', req);
	res.json(data);
});

export default router;
