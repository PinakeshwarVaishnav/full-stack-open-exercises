import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercise } from './exerciseCalculator'

const app = express()
app.use(express.json())
const port = 3003

app.get('/hello', (req, res) => {
	console.log('http request method is', req.method)
	res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res): any => {
	console.log('http request method is', req.method)
	const height = Number(req.query.height)
	const weight = Number(req.query.weight)

	if (!height || !weight) {
		return res.status(400).json({ error: " parameters missing " })
	}

	if (isNaN(height) || isNaN(weight)) {
		return res.status(400).json({ error: "malformatted parameters" })
	}

	const result = calculateBmi(height, weight)

	return res.status(200).json({
		weight: weight,
		height: height,
		bmi: result
	})
})

app.post('/exercises', (req, res): any => {
	console.log('request method is', req)
	const { daily_exercises, target } = req.body

	if (!daily_exercises || !target) {
		return res.status(400).json({ error: 'parameters missing' })
	}

	if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
		return res.status(400).json({ error: 'malformatted parameters' })
	}

	const result = calculateExercise(daily_exercises, target)

	res.json(result)
})

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`)
})


