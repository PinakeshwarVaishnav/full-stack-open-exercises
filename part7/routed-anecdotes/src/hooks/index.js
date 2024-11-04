import { useState } from "react"

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}
	console.log('state of the input value is', value)

	return {
		type,
		value,
		onChange
	}
}

export default useField
