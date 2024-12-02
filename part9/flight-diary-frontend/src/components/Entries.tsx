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
      <h1>Diary Entries</h1>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default Entries
