import { useEffect, useState } from "react"
import { DiaryEntry } from "../types/types"
import axios from "axios"

const Entries: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchedEntries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
        setEntries(response.data)
      } catch (error) {
        console.error('error fetching diary entries', error)
      } finally {
        setLoading(false)
      }
    }

    fetchedEntries()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">Diary Entries</h1>
      {entries.map((entry) => (
        <div key={entry.id} className="bg-white shadow-md rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
          <h3 className="text-xl font-bold text-blue-600">{entry.date}</h3>
          <p className="text-gray-600">visibility: {entry.visibility}</p>
          <p className="text-gray-600">weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default Entries
