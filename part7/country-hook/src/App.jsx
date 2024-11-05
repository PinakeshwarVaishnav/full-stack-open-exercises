import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name, shouldFetch) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (shouldFetch && name) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          const result = await response.data
          console.log('fetched country is', result)
          setCountry(result)
        } catch (error) {
          console.log('error while fetching data', error.message)
        }
      }

      fetchCountry()
    }

  }, [name, shouldFetch])

  console.log('returned country from custom hook is', country)
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.name) {
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log('country received in the country component is', country)
  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)
  const country = useCountry(name, shouldFetch)
  console.log('country is', country)

  const fetch = (e) => {
    e.preventDefault()
    setShouldFetch(true)
    setName(nameInput.value)
    console.log('searching name', nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
