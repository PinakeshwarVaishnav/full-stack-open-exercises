const calculateBmi = (heightInCm: number, weightInKg: number): string => {
	if (heightInCm <= 0 || weightInKg <= 0) {
		throw new Error('height and weight must be greater than zero')
	}

	const heightInM: number = heightInCm / 100

	const bmi: number = weightInKg / (heightInM * heightInM)

	let category: string
	if (bmi < 18.5) {
		category = 'underweight range'
	} else if (bmi >= 18.5 && bmi < 24.9) {
		category = 'normal range'
	} else if (bmi >= 25 && bmi < 29.9) {
		category = 'overweight range'
	} else {
		category = 'obesity range'
	}

	return category

}

console.log(calculateBmi(180, 74))
