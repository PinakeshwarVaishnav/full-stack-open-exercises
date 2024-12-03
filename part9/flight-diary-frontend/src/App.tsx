import Entries from "./components/Entries"
import EntryForm from "./components/EntryForm"

const App: React.FC = () => {
  return (
    <div>
      <EntryForm />
      <Entries />
    </div>
  )
}

export default App
