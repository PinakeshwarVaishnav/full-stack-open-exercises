import React, { useState } from "react"
import axios from "axios"

const EntryForm: React.FC = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault()

    try {
      const diaryEntry = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
      }
      console.log('new created diary entry is', diaryEntry)


      const response = await axios.post('http://localhost:3000/api/diaries', diaryEntry)
      console.log('response after saving new diary entry is', response.data)
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error saving new entry', error)
        alert(error.response?.data)
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">Add new entry</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mt-4 text-gray-700 font-medium">date</label>
        <input type="date" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label className="mt-4 text-gray-700 font-medium">visibility</label>
        <input type="text" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={visibility} onChange={(e) => setVisibility(e.target.value)} required />
        <label className="mt-4 text-gray-700 font-medium">weather</label>
        <input type="text" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={weather} onChange={(e) => setWeather(e.target.value)} required />
        <label className="mt-4 text-gray-700 font-medium">comment</label>
        <input type="text" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 px-4 rounded-lg transition duration-200">add</button>
      </form>
    </div>
  )
}

export default EntryForm
