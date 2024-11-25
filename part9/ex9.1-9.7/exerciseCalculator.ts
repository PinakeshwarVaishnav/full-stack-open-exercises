interface Result {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

const calculateExercise = (dailyExHours: number[], target: number): object => {
	const args = process.argv.slice(2)

	if (args.length < 2) {
		console.error('please provide at least 2 arguments')
		process.exit(1)
	}

	target = parseFloat(args[0])
	dailyExHours = args.slice(1).map(arg => parseFloat(arg))

	if (isNaN(target) || dailyExHours.some(isNaN)) {
		console.error('all arguments must be valid numbers')
		process.exit(1)
	}

	const filteredByExHours: number[] = dailyExHours.filter((ex) => (ex !== 0))

	const average: number = dailyExHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / (dailyExHours.length)

	let rating: number
	let ratingDescription: string
	let success: boolean

	if (average === target || average > target) {
		rating = 5
		ratingDescription = 'well done, target reached'
		success = true
	} else if (average < target && average > 0) {
		rating = 2
		ratingDescription = 'not too bad but could be better'
		success = false
	} else {
		rating = 0
		ratingDescription = 'no exercises'
		success = false
	}

	const result: Result = {
		periodLength: dailyExHours.length,
		trainingDays: filteredByExHours.length,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: average
	}

	return result
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))