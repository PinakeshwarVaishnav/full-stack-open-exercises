import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])

  useEffect(() => {
    console.log('user token is ', token)
  })

  return (
    <Router>
      <>
        <nav className="bg-gray-800 p-4">
          <div className="container flex space-x-4">
            <Link to={'/authors'} className="text-white">authors</Link>
            <Link to={'/books'} className="text-white">books</Link>
            {token ? (
              <>
                <Link to={'/addbook'} className="text-white">add book</Link>
                <Link to={'/recommend'} className="text-white">recommend</Link>
                <button onClick={logout} className="text-white">logout</button>
              </>
            ) : (
              <Link to={'/login'} className="text-white">login</Link>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/addbook" element={<NewBook />} />
          <Route path="/recommend" element={<Recommendations />} />
          <Route path="/login" element={<LoginForm setToken={setToken} token={token} />} />
        </Routes>
      </>
    </Router >
  );
};

export default App;
