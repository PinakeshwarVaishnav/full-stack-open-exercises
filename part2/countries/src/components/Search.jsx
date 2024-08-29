import { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${searchTerm}`
      );
      const data = await response.json();
      setCountries(data);
    };
    fetchCountries();
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      find countries
      <input type="text" value={searchTerm} onChange={handleInputChange} />
    </div>
  );
};

export default Search;
